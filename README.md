# ⬆️ Honors Society Point Manager

Tri-M Manager is a simple online tool for managing our Tri-M chapter.
It helps us keep track of members, events, and important information all in one place.

---

## 🚀 How to Get Started?

1. Fork (or clone) this Git Repository
2. Sign in (or sign up) for Netlify
3. Add a new project to Netlify
4. Sign in with your Github Account, and deploy this project
   - When prompted to add environment variables, copy the [.env.example](.env.example) file and replacing instances of `<sql_lite_url>` and `<s3_access_key_id>` with your own values.
   - If using a platform (such as Netlify), you may need to copy `POINT_TYPES` into the `NEXT_PUBLIC_POINT_TYPES` enviornment variable (instead of using the shorthand `$POINT_TYPES`). Some platforms (such as self-hosting) allow you to use the variables like in the `.env.example`.
5. Deploy!
   - Recommend adding a domain, as some schools block the `netlify.app` domain

## 🌐 How to Access

You can use Honors Society Point Manager right in your browser — no downloads needed.

---

## 🔑 How to Access Officer Portal

We use **Google Sign-In** for secure access.
Just click the **"Sign in with Google"** button on the homepage.

> Only officer approved email addresses and the one provided in the `.env` will work

---

## 📦 How It Works (Simple Version)

You don’t need to understand all the technical details,
but here’s what’s happening behind the scenes:

- **GitHub** – Stores and tracks the project’s code.
- **Platform as a Service** – Hosts the website so it’s always online.
  - Recommended Service: [Netlify](https://www.netlify.com/)
- **SQLite** – Stores our main data in a secure database.
  - Recommended Service: [Turso](https://turso.tech/)
- **S3 Buckets** – Stores files (like images) in a secure “bucket” online.
  - Recommended Service: [Filebase](https://filebase.com/)
- **Bun** – Helps run and build the project quickly.
- **React / Next.JS** – The framework used to build the app.
- **Drizzle** – Manages how we talk to the database.
- **Better Auth** – Makes sign-in and account protection easy.
- **Google Auth** – Lets members log in with their Google account.
  - Recommended Service: [Google Cloud Console](https://console.cloud.google.com/)
    - `Google Cloud Console -> APIs & Services -> Credentials -> OAuth 2.0 Client IDs`

---

## 📬 Support

For help or questions, email: **help@bluefla.me**

---

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---
