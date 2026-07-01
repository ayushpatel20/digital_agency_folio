const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

let dbPath = path.join(__dirname, 'database.db');

// If running on Vercel, copy database to /tmp so we can write to it
if (process.env.VERCEL || process.env.NOW_BUILDER) {
    const tmpDbPath = path.join('/tmp', 'database.db');
    try {
        if (!fs.existsSync(tmpDbPath)) {
            if (fs.existsSync(dbPath)) {
                fs.copyFileSync(dbPath, tmpDbPath);
                console.log('Database copied to /tmp');
            } else {
                console.log('Source database file not found at: ' + dbPath);
            }
        }
        dbPath = tmpDbPath;
    } catch (err) {
        console.error('Failed to copy database to /tmp:', err);
    }
}

const db = new sqlite3.Database(dbPath);

// Wrap sqlite3 operations in Promises
const dbManager = {
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        });
    },

    async init() {
        // Create tables
        await this.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                bullets TEXT,
                order_index INTEGER DEFAULT 0
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS testimonials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                author_name TEXT NOT NULL,
                author_role TEXT NOT NULL,
                author_avatar TEXT NOT NULL,
                order_index INTEGER DEFAULT 0
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS team (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                designation TEXT NOT NULL,
                image TEXT NOT NULL,
                socials TEXT,
                order_index INTEGER DEFAULT 0
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS portfolio (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                image TEXT NOT NULL,
                order_index INTEGER DEFAULT 0
            )
        `);

        await this.run(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT NOT NULL,
                name TEXT,
                order_index INTEGER DEFAULT 0
            )
        `);

        // Seed default Admin user if none exists
        const adminUser = await this.get("SELECT * FROM users WHERE email = ?", ['admin@uifolio.com']);
        if (!adminUser) {
            const hash = await bcrypt.hash('admin123', 10);
            await this.run("INSERT INTO users (email, password_hash) VALUES (?, ?)", ['admin@uifolio.com', hash]);
            console.log('Seeded default admin account: admin@uifolio.com / admin123');
        }

        // Seed settings
        const settingsCount = await this.get("SELECT COUNT(*) as count FROM settings");
        if (settingsCount.count === 0) {
            const defaultSettings = {
                site_name: "Uifolio",
                site_title: "Uifolio",
                logo_light: "assets/imgs/LOGO.png",
                logo_dark: "assets/imgs/LOGO.png",
                logo_mobile: "assets/imgs/LOGO.png",
                favicon: "assets/imgs/LOGO.png",
                seo_keywords: "HTML5 Template Uifolio Multi-Purpose themeforest",
                seo_description: "Uifolio - Multi-Purpose HTML5 Template",
                hero_title: "We are a creative <br> digital agency.",
                hero_subtitle: "Uifolio",
                hero_description: "We’re a leading digital product agency focused on branding, UI/UX design, mobile, and web development.",
                about_heading: "We provide brilliant idea to grow the startup & agency with your",
                about_subheading: "How We Are?",
                about_stat_1_val: "15",
                about_stat_1_lbl: "We helped to get companies with $15M+ funding",
                about_stat_2_val: "86+",
                about_stat_2_lbl: "Projects Done",
                about_stat_3_val: "98%",
                about_stat_3_lbl: "Successful Rating",
                about_stat_4_val: "223m",
                about_stat_4_lbl: "Growth Net Worth",
                about_stat_desc: "Consumers today rely heavily on digital means to research products. We research a brand of bldend engaging with it, according to the meanwhile, 51% of consumers",
                about_stat_arrow: "assets/imgs/lg-arrow-top.svg",
                intro_quote: "Whether it's crafting a visually stunning brand identity, the creative design",
                intro_quote_bg: "assets/imgs/intro/14.png",
                contact_address_1: "49 Brimmer St, Boston, MA 02108",
                contact_email_1: "hello@archin.co",
                contact_phone_1: "(054) 3256 78 87",
                contact_address_2: "2221 Sw Broadway Dr, Portland, OR 97201",
                contact_email_2: "portland@archin.co",
                contact_phone_2: "(021) 4246 63 68",
                footer_copyright: "© 2025 Uifolio Agency. All Right Reserved",
                social_twitter: "#0",
                social_facebook: "#0",
                social_instagram: "#0",
                social_linkedin: "#0",
                social_youtube: "#0"
            };

            for (const [key, value] of Object.entries(defaultSettings)) {
                await this.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value]);
            }
            console.log('Seeded default settings');
        }

        // Seed Services
        const servicesCount = await this.get("SELECT COUNT(*) as count FROM services");
        if (servicesCount.count === 0) {
            const defaultServices = [
                {
                    title: "Branding",
                    description: "We create branding that tells your story with clarity, consistency, and emotional impact.",
                    image: "assets/imgs/serv/1.jpg",
                    bullets: JSON.stringify(["Creative Direction", "UX Research", "Usability Testing", "Wireframing", "Prototyping"]),
                    order_index: 1
                },
                {
                    title: "Branding",
                    description: "We create branding that tells your story with clarity, consistency, and emotional impact.",
                    image: "assets/imgs/serv/2.jpg",
                    bullets: JSON.stringify(["Creative Direction", "UX Research", "Usability Testing", "Wireframing", "Prototyping"]),
                    order_index: 2
                },
                {
                    title: "Branding",
                    description: "We create branding that tells your story with clarity, consistency, and emotional impact.",
                    image: "assets/imgs/serv/3.jpg",
                    bullets: JSON.stringify(["Creative Direction", "UX Research", "Usability Testing", "Wireframing", "Prototyping"]),
                    order_index: 3
                }
            ];

            for (const s of defaultServices) {
                await this.run(
                    "INSERT INTO services (title, description, image, bullets, order_index) VALUES (?, ?, ?, ?, ?)",
                    [s.title, s.description, s.image, s.bullets, s.order_index]
                );
            }
            console.log('Seeded default services');
        }

        // Seed Team
        const teamCount = await this.get("SELECT COUNT(*) as count FROM team");
        if (teamCount.count === 0) {
            const defaultTeam = [
                {
                    name: "Jurgen Klopp",
                    designation: "CEO Founder",
                    image: "assets/imgs/team/1.png",
                    socials: JSON.stringify({ twitter: "#0", instagram: "#0", dribbble: "#0", behance: "#0" }),
                    order_index: 1
                },
                {
                    name: "Rahat Chowhury",
                    designation: "CTO & Product Management",
                    image: "assets/imgs/team/2.png",
                    socials: JSON.stringify({ twitter: "#0", instagram: "#0" }),
                    order_index: 2
                },
                {
                    name: "Luke Van de Berg",
                    designation: "Marketing Director",
                    image: "assets/imgs/team/3.png",
                    socials: JSON.stringify({ twitter: "#0", dribbble: "#0", behance: "#0" }),
                    order_index: 3
                },
                {
                    name: "Logan Dang",
                    designation: "Creative Director",
                    image: "assets/imgs/team/4.png",
                    socials: JSON.stringify({ instagram: "#0", dribbble: "#0", behance: "#0" }),
                    order_index: 4
                }
            ];

            for (const t of defaultTeam) {
                await this.run(
                    "INSERT INTO team (name, designation, image, socials, order_index) VALUES (?, ?, ?, ?, ?)",
                    [t.name, t.designation, t.image, t.socials, t.order_index]
                );
            }
            console.log('Seeded default team members');
        }

        // Seed Testimonials
        const testimonialsCount = await this.get("SELECT COUNT(*) as count FROM testimonials");
        if (testimonialsCount.count === 0) {
            const defaultTestimonials = [
                {
                    text: "“Hubfolio studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity. Recommend!.”",
                    author_name: "Bradley Gordon",
                    author_role: "CEO & Founder, Archin Studio",
                    author_avatar: "assets/imgs/testim/avatar1.jpg",
                    order_index: 1
                },
                {
                    text: "“Hubfolio studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity. Recommend!.”",
                    author_name: "Bradley Gordon",
                    author_role: "CEO & Founder, Archin Studio",
                    author_avatar: "assets/imgs/testim/avatar2.jpg",
                    order_index: 2
                },
                {
                    text: "“Hubfolio studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity. Recommend!.”",
                    author_name: "Bradley Gordon",
                    author_role: "CEO & Founder, Archin Studio",
                    author_avatar: "assets/imgs/testim/avatar3.jpg",
                    order_index: 3
                }
            ];

            for (const t of defaultTestimonials) {
                await this.run(
                    "INSERT INTO testimonials (text, author_name, author_role, author_avatar, order_index) VALUES (?, ?, ?, ?, ?)",
                    [t.text, t.author_name, t.author_role, t.author_avatar, t.order_index]
                );
            }
            console.log('Seeded default testimonials');
        }

        // Seed Clients
        const clientsCount = await this.get("SELECT COUNT(*) as count FROM clients");
        if (clientsCount.count === 0) {
            const defaultClients = [
                { image: "assets/imgs/clients/1.svg", name: "Client 1", order_index: 1 },
                { image: "assets/imgs/clients/2.svg", name: "Client 2", order_index: 2 },
                { image: "assets/imgs/clients/3.svg", name: "Client 3", order_index: 3 },
                { image: "assets/imgs/clients/4.svg", name: "Client 4", order_index: 4 },
                { image: "assets/imgs/clients/5.svg", name: "Client 5", order_index: 5 }
            ];

            for (const c of defaultClients) {
                await this.run(
                    "INSERT INTO clients (image, name, order_index) VALUES (?, ?, ?)",
                    [c.image, c.name, c.order_index]
                );
            }
            console.log('Seeded default clients');
        }

        // Seed Portfolio
        const portfolioCount = await this.get("SELECT COUNT(*) as count FROM portfolio");
        if (portfolioCount.count === 0) {
            const defaultPortfolio = [
                { title: "Unerio Residential", category: "Branding", image: "assets/imgs/works/1/1.webp", order_index: 1 },
                { title: "Jorger Clarkson", category: "Digital", image: "assets/imgs/works/1/2.webp", order_index: 2 },
                { title: "Festonax Card", category: "Web Design", image: "assets/imgs/works/1/3.webp", order_index: 3 },
                { title: "Jimmy Fermin", category: "Development", image: "assets/imgs/works/1/4.webp", order_index: 4 }
            ];

            for (const p of defaultPortfolio) {
                await this.run(
                    "INSERT INTO portfolio (title, category, image, order_index) VALUES (?, ?, ?, ?)",
                    [p.title, p.category, p.image, p.order_index]
                );
            }
            console.log('Seeded default portfolio items');
        }
    }
};

module.exports = dbManager;
