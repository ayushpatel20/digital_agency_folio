const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const multer = require('multer');

const db = require('./db');

const app = express();
const PORT = parseInt(process.env.PORT || 3000, 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('uifolio-secret-signature'));

// Upload directory configuration
let uploadDir = path.join(__dirname, 'assets', 'uploads');
if (process.env.VERCEL || process.env.NOW_BUILDER) {
    uploadDir = path.join('/tmp', 'uploads');
}
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Multer Storage Configuration (Secure upload filename and limits)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'file-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return cb(new Error('Only images, webp, svg and favicon files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Session Management (In-Memory Map for simplicity and security)
const sessions = new Map(); // token -> { user_id, email, expires }

function requireAuth(req, res, next) {
    const token = req.cookies.admin_session;
    if (!token || !sessions.has(token)) {
        return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }
    const session = sessions.get(token);
    if (Date.now() > session.expires) {
        sessions.delete(token);
        res.clearCookie('admin_session');
        return res.status(401).json({ error: 'Session expired. Please login again.' });
    }
    req.user = session;
    next();
}

// Helper: Apply Dynamic Content to HTML
async function applyDynamicContent(pageName, html) {
    const $ = cheerio.load(html);

    // 1. Fetch settings from DB
    const settingsRows = await db.all("SELECT * FROM settings");
    const settings = {};
    settingsRows.forEach(r => { settings[r.key] = r.value; });

    // 2. Apply Global settings
    if (settings.site_title) $('title').text(settings.site_title);
    if (settings.seo_keywords) $('meta[name="keywords"]').attr('content', settings.seo_keywords);
    if (settings.seo_description) $('meta[name="description"]').attr('content', settings.seo_description);

    if (settings.favicon) {
        $('link[rel="shortcut icon"]').attr('href', settings.favicon);
        $('link[rel="apple-touch-icon"]').attr('href', settings.favicon);
        $('link[rel="favicon"]').attr('href', settings.favicon);
    }

    // Replace Logos everywhere (navbar / footer logos)
    if (settings.logo_light) {
        $('nav .logo img').attr('src', settings.logo_light);
    }

    // Clean up navigation dropdowns to contain only "Digital Agency"
    $('nav .navbar-nav .dropdown').each((i, dropdownEl) => {
        const dropdown = $(dropdownEl);
        const dropdownMenu = dropdown.find('.dropdown-menu');
        if (dropdownMenu.length > 0) {
            dropdownMenu.empty();
            dropdownMenu.append('<li><a class="dropdown-item" href="home-digital-agency.html">Digital Agency</a></li>');
        }
    });

    // Footer Copyright text
    if (settings.footer_copyright) {
        $('footer .col-md-6 p.fs-14').text(settings.footer_copyright);
    }

    // Social Links in Footer
    const contactCols = $('footer .container .row').first().find('.col-lg-4');
    if (contactCols.length > 0) {
        const socialContainer = contactCols.eq(0).find('.social-icon-circle');
        if (socialContainer.length > 0) {
            socialContainer.empty();
            if (settings.social_twitter) socialContainer.append(`<a href="${settings.social_twitter}"> <i class="fab fa-x-twitter"></i> </a>`);
            if (settings.social_facebook) socialContainer.append(`<a href="${settings.social_facebook}"> <i class="fab fa-facebook-f"></i> </a>`);
            if (settings.social_instagram) socialContainer.append(`<a href="${settings.social_instagram}"> <i class="fab fa-instagram"></i> </a>`);
            if (settings.social_linkedin) socialContainer.append(`<a href="${settings.social_linkedin}"> <i class="fab fa-linkedin-in"></i> </a>`);
            if (settings.social_youtube) socialContainer.append(`<a href="${settings.social_youtube}"> <i class="fab fa-youtube"></i> </a>`);
        }

        // Col 2: Contact Info 1
        const contact1 = contactCols.eq(1).find('.item');
        if (contact1.length > 0) {
            if (settings.contact_heading_1) contact1.find('h6').text(settings.contact_heading_1);
            if (settings.contact_address_1) contact1.find('p').eq(0).text(settings.contact_address_1);
            if (settings.contact_email_1) contact1.find('p').eq(1).text(settings.contact_email_1);
            if (settings.contact_phone_1) contact1.find('p').eq(2).text(settings.contact_phone_1);
        }

        // Col 3: Contact Info 2
        const contact2 = contactCols.eq(2).find('.item');
        if (contact2.length > 0) {
            if (settings.contact_heading_2) contact2.find('h6').text(settings.contact_heading_2);
            if (settings.contact_address_2) contact2.find('p').eq(0).text(settings.contact_address_2);
            if (settings.contact_email_2) contact2.find('p').eq(1).text(settings.contact_email_2);
            if (settings.contact_phone_2) contact2.find('p').eq(2).text(settings.contact_phone_2);
        }
    }

    // 3. Apply Page-Specific content for home-digital-agency.html
    if (pageName === 'home-digital-agency.html') {
        // Hero Section
        if (settings.hero_title) $('.hero-style1 .caption h1').html(settings.hero_title);
        if (settings.hero_subtitle) $('.hero-style1 .lg-text h1').text(settings.hero_subtitle);
        if (settings.hero_description) $('.hero-style1 .text p').text(settings.hero_description);

        // Portfolio/Works
        const portfolioList = await db.all("SELECT * FROM portfolio ORDER BY order_index ASC");
        if (portfolioList.length > 0) {
            // Desktop
            const deskWrapper = $('.wrapper-imgs');
            if (deskWrapper.length > 0) {
                deskWrapper.empty();
                portfolioList.forEach(p => {
                    deskWrapper.append(`
                        <div class="fit-img">
                            <img src="${p.image}" alt="">
                            <div class="info">
                                <h6 class="fw-600">${p.title}</h6>
                                <span class="text-uppercase mt-5px fs-14 opacity-7">${p.category}</span>
                            </div>
                        </div>
                    `);
                });
            }

            // Mobile
            const mobWrapper = $('.cards-wrapper .row');
            if (mobWrapper.length > 0) {
                mobWrapper.empty();
                portfolioList.forEach(p => {
                    mobWrapper.append(`
                        <div class="col-lg-3 col-md-6">
                            <div class="item md-mb30">
                                <div class="fit-img">
                                    <img src="${p.image}" alt="">
                                    <div class="info">
                                        <h6 class="fw-600">${p.title}</h6>
                                        <span class="text-uppercase mt-5px fs-14 opacity-7">${p.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }

        // Services
        const servicesList = await db.all("SELECT * FROM services ORDER BY order_index ASC");
        if (servicesList.length > 0) {
            const servicesContainer = $('.serv-style1 .container');
            if (servicesContainer.length > 0) {
                const servicesHeadingRow = servicesContainer.find('.row').first();
                servicesContainer.empty();
                servicesContainer.append(servicesHeadingRow);

                servicesList.forEach((s, idx) => {
                    const isLast = idx === servicesList.length - 1;
                    const mbClass = isLast ? '' : 'mb-50px';
                    const numStr = String(idx + 1).padStart(2, '0');
                    const bullets = JSON.parse(s.bullets || '[]');
                    const bulletListHtml = bullets.map(b => `<li>${b}</li>`).join('\n');

                    servicesContainer.append(`
                        <div class="item ${mbClass}">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                    <div class="title md-mb30">
                                        <span class="fs-14 opacity-7 mb-15px">${numStr}</span>
                                        <h2>${s.title}</h2>
                                        <div class="mt-20px pr-30px">
                                            <p>${s.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="img fit-img md-mb30">
                                        <img src="${s.image}" alt="">
                                    </div>
                                </div>
                                <div class="col-lg-3 offset-lg-1">
                                    <div>
                                        <ul>
                                            ${bulletListHtml}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }

        // Testimonials
        const testimonialsList = await db.all("SELECT * FROM testimonials ORDER BY order_index ASC");
        if (testimonialsList.length > 0) {
            const testimWrapper = $('.testim-swiper .swiper-wrapper');
            if (testimWrapper.length > 0) {
                testimWrapper.empty();
                testimonialsList.forEach(t => {
                    testimWrapper.append(`
                        <div class="swiper-slide">
                            <div class="item">
                                <div class="text">
                                    <h4>${t.text}</h4>
                                </div>
                                <div class="info d-flex align-items-center mt-40px pt-30px">
                                    <div>
                                        <div class="img-author">
                                            <img src="${t.author_avatar}" alt="">
                                        </div>
                                    </div>
                                    <div class="info-text">
                                        <span>${t.author_name}</span>
                                        <p>${t.author_role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }

        // Clients
        const clientsList = await db.all("SELECT * FROM clients ORDER BY order_index ASC");
        if (clientsList.length > 0) {
            const clientsRow = $('.clients-ds .row.sm-marg');
            if (clientsRow.length > 0) {
                clientsRow.empty();
                clientsList.forEach((c, idx) => {
                    const mbClass = idx < 3 ? 'md-mb30' : (idx === 3 ? 'sm-mb30' : '');
                    clientsRow.append(`
                        <div class="col-lg col-md-4 col-6 ${mbClass}">
                            <div class="item d-flex align-items-center justify-content-center">
                                <div class="img">
                                    <img src="${c.image}" alt="${c.name || ''}">
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }

        // About Stats
        const stat1 = $('.intro-style2 .row.mb-80px').eq(1);
        if (stat1.length > 0) {
            stat1.find('.col-md-5 h2').html(`${settings.about_stat_1_val || '15'} <span>M</span>`);
            stat1.find('.col-md-5 > span').text(settings.about_stat_1_lbl || '');
            stat1.find('.col-lg-6 p').text(settings.about_stat_desc || '');
            if (settings.about_stat_arrow) stat1.find('.col-lg-6 img').attr('src', settings.about_stat_arrow);
        }

        const numberCleanDivs = $('.intro-style2 .number-clean');
        if (numberCleanDivs.length >= 3) {
            numberCleanDivs.eq(0).find('h2').text(settings.about_stat_2_val || '86+');
            numberCleanDivs.eq(0).find('span').text(settings.about_stat_2_lbl || 'Projects Done');

            numberCleanDivs.eq(1).find('h2').text(settings.about_stat_3_val || '98%');
            numberCleanDivs.eq(1).find('span').text(settings.about_stat_3_lbl || 'Successful Rating');

            numberCleanDivs.eq(2).find('h2').text(settings.about_stat_4_val || '223m');
            numberCleanDivs.eq(2).find('span').text(settings.about_stat_4_lbl || 'Growth Net Worth');
        }

        if (settings.about_subheading) {
            $('.intro-style2 .row.mb-80px .col-lg-3 .text-uppercase span').text(settings.about_subheading);
        }

        if (settings.about_heading) {
            $('.intro-style2 h2.fs-60').html(`
                <span class="fw-200 play-text">${settings.about_heading_play || 'We provide brilliant idea'}</span> ${settings.about_heading_main || 'to grow the startup & agency with your'}
                <span class="d-flex align-items-center">${settings.about_heading_accent || 'sharp brand.'}<a href="#0" class="butn-arrow-circle fs-14 ml-15px">Get Started <span class="icon"><i class="fa-solid fa-arrow-right"></i></span></a></span>
            `);
        }

        // Intro Quote
        if (settings.intro_quote) {
            $('.intro-style3 h2').html(settings.intro_quote);
        }
        if (settings.intro_quote_bg) {
            $('.intro-style3').attr('data-background', settings.intro_quote_bg);
            $('.intro-style3').css('background-image', `url(${settings.intro_quote_bg})`);
        }

        // Team
        const teamList = await db.all("SELECT * FROM team ORDER BY order_index ASC");
        if (teamList.length > 0) {
            const teamContainer = $('.team-mp');
            if (teamContainer.length > 0) {
                const teamHeadingRow = teamContainer.find('.row').first();
                teamContainer.empty();
                teamContainer.append(teamHeadingRow);

                teamList.forEach((t, idx) => {
                    const isLast = idx === teamList.length - 1;
                    const mbClass = isLast ? '' : 'mb-10px';
                    const socials = JSON.parse(t.socials || '{}');
                    let socialLinksHtml = '';
                    if (socials.twitter) {
                        socialLinksHtml += `<a href="${socials.twitter}"><i class="fa-brands fa-x-twitter"></i></a>\n`;
                    }
                    if (socials.instagram) {
                        socialLinksHtml += `<a href="${socials.instagram}"><i class="fa-brands fa-instagram"></i></a>\n`;
                    }
                    if (socials.dribbble) {
                        socialLinksHtml += `<a href="${socials.dribbble}"><i class="fa-brands fa-dribbble"></i></a>\n`;
                    }
                    if (socials.behance) {
                        socialLinksHtml += `<a href="${socials.behance}"><i class="fa-brands fa-behance"></i></a>\n`;
                    }

                    teamContainer.append(`
                        <div class="item ${mbClass}">
                            <div class="d-flex">
                                <div>
                                    <div class="img fit-img">
                                        <img src="${t.image}" alt="">
                                    </div>
                                </div>
                                <div class="cont">
                                    <h3>${t.name}</h3>
                                    <span>${t.designation}</span>
                                </div>
                                <div class="ml-auto">
                                    <div class="social-icon">
                                        ${socialLinksHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }
    }

    return $.html();
}

// ----------------------------------------------------
// Authentication API Routes
// ----------------------------------------------------

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate cryptographically secure token
        const token = crypto.randomBytes(32).toString('hex');
        const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry

        sessions.set(token, {
            user_id: user.id,
            email: user.email,
            expires: sessionExpiry
        });

        // Set secure HTTP-only cookie
        res.cookie('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Login successful.', email: user.email });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    const token = req.cookies.admin_session;
    if (token) {
        sessions.delete(token);
    }
    res.clearCookie('admin_session');
    res.json({ message: 'Logged out successfully.' });
});

app.get('/api/auth/session', (req, res) => {
    const token = req.cookies.admin_session;
    if (!token || !sessions.has(token)) {
        return res.json({ authenticated: false });
    }
    const session = sessions.get(token);
    if (Date.now() > session.expires) {
        sessions.delete(token);
        res.clearCookie('admin_session');
        return res.json({ authenticated: false });
    }
    res.json({ authenticated: true, email: session.email });
});

// ----------------------------------------------------
// Settings CRUD APIs
// ----------------------------------------------------

app.get('/api/settings', async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM settings");
        const settings = {};
        rows.forEach(r => { settings[r.key] = r.value; });
        res.json(settings);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

app.post('/api/settings', requireAuth, async (req, res) => {
    const settings = req.body;
    try {
        for (const [key, value] of Object.entries(settings)) {
            await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value]);
        }
        res.json({ message: 'Settings updated successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// ----------------------------------------------------
// Services CRUD APIs
// ----------------------------------------------------

app.get('/api/services', async (req, res) => {
    try {
        const services = await db.all("SELECT * FROM services ORDER BY order_index ASC");
        res.json(services);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

app.post('/api/services', requireAuth, async (req, res) => {
    const { id, title, description, image, bullets, order_index } = req.body;
    if (!title || !description || !image) {
        return res.status(400).json({ error: 'Title, description and image are required.' });
    }

    try {
        if (id) {
            await db.run(
                "UPDATE services SET title = ?, description = ?, image = ?, bullets = ?, order_index = ? WHERE id = ?",
                [title, description, image, JSON.stringify(bullets || []), order_index || 0, id]
            );
            res.json({ message: 'Service updated successfully.' });
        } else {
            await db.run(
                "INSERT INTO services (title, description, image, bullets, order_index) VALUES (?, ?, ?, ?, ?)",
                [title, description, image, JSON.stringify(bullets || []), order_index || 0]
            );
            res.json({ message: 'Service created successfully.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to save service' });
    }
});

app.delete('/api/services/:id', requireAuth, async (req, res) => {
    try {
        await db.run("DELETE FROM services WHERE id = ?", [req.params.id]);
        res.json({ message: 'Service deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

// ----------------------------------------------------
// Testimonials CRUD APIs
// ----------------------------------------------------

app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await db.all("SELECT * FROM testimonials ORDER BY order_index ASC");
        res.json(testimonials);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

app.post('/api/testimonials', requireAuth, async (req, res) => {
    const { id, text, author_name, author_role, author_avatar, order_index } = req.body;
    if (!text || !author_name || !author_role || !author_avatar) {
        return res.status(400).json({ error: 'All testimonial fields are required.' });
    }

    try {
        if (id) {
            await db.run(
                "UPDATE testimonials SET text = ?, author_name = ?, author_role = ?, author_avatar = ?, order_index = ? WHERE id = ?",
                [text, author_name, author_role, author_avatar, order_index || 0, id]
            );
            res.json({ message: 'Testimonial updated successfully.' });
        } else {
            await db.run(
                "INSERT INTO testimonials (text, author_name, author_role, author_avatar, order_index) VALUES (?, ?, ?, ?, ?)",
                [text, author_name, author_role, author_avatar, order_index || 0]
            );
            res.json({ message: 'Testimonial created successfully.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to save testimonial' });
    }
});

app.delete('/api/testimonials/:id', requireAuth, async (req, res) => {
    try {
        await db.run("DELETE FROM testimonials WHERE id = ?", [req.params.id]);
        res.json({ message: 'Testimonial deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// ----------------------------------------------------
// Team CRUD APIs
// ----------------------------------------------------

app.get('/api/team', async (req, res) => {
    try {
        const team = await db.all("SELECT * FROM team ORDER BY order_index ASC");
        res.json(team);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});

app.post('/api/team', requireAuth, async (req, res) => {
    const { id, name, designation, image, socials, order_index } = req.body;
    if (!name || !designation || !image) {
        return res.status(400).json({ error: 'Name, designation and image are required.' });
    }

    try {
        const socialsStr = JSON.stringify(socials || {});
        if (id) {
            await db.run(
                "UPDATE team SET name = ?, designation = ?, image = ?, socials = ?, order_index = ? WHERE id = ?",
                [name, designation, image, socialsStr, order_index || 0, id]
            );
            res.json({ message: 'Team member updated successfully.' });
        } else {
            await db.run(
                "INSERT INTO team (name, designation, image, socials, order_index) VALUES (?, ?, ?, ?, ?)",
                [name, designation, image, socialsStr, order_index || 0]
            );
            res.json({ message: 'Team member created successfully.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to save team member' });
    }
});

app.delete('/api/team/:id', requireAuth, async (req, res) => {
    try {
        await db.run("DELETE FROM team WHERE id = ?", [req.params.id]);
        res.json({ message: 'Team member deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete team member' });
    }
});

// ----------------------------------------------------
// Portfolio CRUD APIs
// ----------------------------------------------------

app.get('/api/portfolio', async (req, res) => {
    try {
        const portfolio = await db.all("SELECT * FROM portfolio ORDER BY order_index ASC");
        res.json(portfolio);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

app.post('/api/portfolio', requireAuth, async (req, res) => {
    const { id, title, category, image, order_index } = req.body;
    if (!title || !category || !image) {
        return res.status(400).json({ error: 'Title, category and image are required.' });
    }

    try {
        if (id) {
            await db.run(
                "UPDATE portfolio SET title = ?, category = ?, image = ?, order_index = ? WHERE id = ?",
                [title, category, image, order_index || 0, id]
            );
            res.json({ message: 'Portfolio item updated successfully.' });
        } else {
            await db.run(
                "INSERT INTO portfolio (title, category, image, order_index) VALUES (?, ?, ?, ?)",
                [title, category, image, order_index || 0]
            );
            res.json({ message: 'Portfolio item created successfully.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to save portfolio item' });
    }
});

app.delete('/api/portfolio/:id', requireAuth, async (req, res) => {
    try {
        await db.run("DELETE FROM portfolio WHERE id = ?", [req.params.id]);
        res.json({ message: 'Portfolio item deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete portfolio item' });
    }
});

// ----------------------------------------------------
// Clients CRUD APIs
// ----------------------------------------------------

app.get('/api/clients', async (req, res) => {
    try {
        const clients = await db.all("SELECT * FROM clients ORDER BY order_index ASC");
        res.json(clients);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

app.post('/api/clients', requireAuth, async (req, res) => {
    const { id, image, name, order_index } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'Client logo image is required.' });
    }

    try {
        if (id) {
            await db.run(
                "UPDATE clients SET image = ?, name = ?, order_index = ? WHERE id = ?",
                [image, name || '', order_index || 0, id]
            );
            res.json({ message: 'Client updated successfully.' });
        } else {
            await db.run(
                "INSERT INTO clients (image, name, order_index) VALUES (?, ?, ?)",
                [image, name || '', order_index || 0]
            );
            res.json({ message: 'Client created successfully.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to save client' });
    }
});

app.delete('/api/clients/:id', requireAuth, async (req, res) => {
    try {
        await db.run("DELETE FROM clients WHERE id = ?", [req.params.id]);
        res.json({ message: 'Client deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete client' });
    }
});

// ----------------------------------------------------
// Media Management APIs
// ----------------------------------------------------

app.get('/api/media', requireAuth, (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read media directory' });
        }
        // Map files to local URLs
        const mediaList = files
            .filter(file => !file.startsWith('.'))
            .map(file => {
                const filePath = path.join(uploadDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    url: `assets/uploads/${file}`,
                    size: stats.size,
                    createdAt: stats.mtime
                };
            })
            // Sort by newly created first
            .sort((a, b) => b.createdAt - a.createdAt);
        res.json(mediaList);
    });
});

app.post('/api/media/upload', requireAuth, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or file type not allowed.' });
    }
    const fileUrl = `assets/uploads/${req.file.filename}`;
    res.json({ message: 'File uploaded successfully.', url: fileUrl });
});

app.post('/api/media/delete', requireAuth, (req, res) => {
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ error: 'Filename is required.' });
    }

    // Security: sanitize path against directory traversal
    const safeName = path.basename(filename);
    const filePath = path.join(uploadDir, safeName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found.' });
    }

    try {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete file.' });
    }
});

// ----------------------------------------------------
// HTML Dynamic Rendering Routing
// ----------------------------------------------------

// Serve Admin Dashboard SPA
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Render index or base root dynamically to home-digital-agency.html
app.get('/', async (req, res) => {
    const filePath = path.join(__dirname, 'home-digital-agency.html');
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        const rendered = await applyDynamicContent('home-digital-agency.html', html);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(rendered);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error loading website root.');
    }
});

// Intercept specific html templates to pre-render dynamic updates
app.get('/:page.html', async (req, res, next) => {
    const pageName = req.params.page + '.html';
    const filePath = path.join(__dirname, pageName);
    if (!fs.existsSync(filePath)) {
        return next();
    }
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        const rendered = await applyDynamicContent(pageName, html);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(rendered);
    } catch (e) {
        console.error(e);
        res.status(500).send(`Internal Server Error rendering ${pageName}`);
    }
});

// Serve assets, css, and root static directories
app.use('/assets/uploads', express.static(uploadDir));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname), {
    index: false,
    extensions: ['html', 'htm']
}));

// Initialize database & start server
db.init().then(async () => {
    // Add additional settings keys if they aren't seeded yet
    const play = await db.get("SELECT * FROM settings WHERE key = ?", ['about_heading_play']);
    if (!play) {
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_heading_play', 'We provide brilliant idea']);
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_heading_main', 'to grow the startup & agency with your']);
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_heading_accent', 'sharp brand.']);
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_stat_arrow', 'assets/imgs/lg-arrow-top.svg']);
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_heading_1', 'Boston, MA']);
        await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", ['about_heading_2', 'Portland, OR']);
    }

    app.listen(PORT, () => {
        console.log('\n==================================================');
        console.log(`🚀 Production CMS server running!`);
        console.log(`🔗 Local Address: http://localhost:${PORT}/`);
        console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/admin`);
        console.log('==================================================\n');
    });
}).catch(err => {
    console.error('Fatal database initialization failure:', err);
    process.exit(1);
});
