# Rithish Murugan - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS. Showcasing my work as a Software Engineer specializing in Agentic AI, RAG pipelines, and backend automation.

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient effects and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Typewriter Animations**: Engaging hero section with animated text
- **Project Showcase**: Featured projects with GitHub links
- **Contact Form**: Integrated with Supabase for message handling
- **Skills Section**: Comprehensive technical expertise display
- **Experience Timeline**: Professional journey and career progression

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (for contact form)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RithishMurugan/rithish-portfolio.git
   cd rithish-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SECRET_KEY=your_service_role_or_secret_key
   ```
   The contact form uses a **server-only** key (`SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` on Vercel). Do not expose it with `NEXT_PUBLIC_`.

4. **Set up Supabase** (for contact form)
   - Create a Supabase project
   - Run the SQL script in `supabase-setup.sql` in your Supabase SQL Editor
   - Add your Supabase URL and server key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The project is configured for Vercel deployment with `vercel.json`.

## 📁 Project Structure

```
rithish-portfolio/
├── app/
│   ├── api/contact/    # Contact form API (Supabase insert)
│   ├── components/     # React components
│   ├── globals.css     # Global styles
│   ├── layout.jsx      # Root layout
│   └── page.jsx        # Home page
├── public/             # Static assets
├── supabase-setup.sql  # Database setup script
└── package.json        # Dependencies
```


## 👤 Author

**Rithish Murugan**
- GitHub: [@RithishMurugan](https://github.com/RithishMurugan)
- LinkedIn: [rithishmurugan](https://linkedin.com/in/rithishmurugan)
- Email: muruganrithish01@gmail.com

---


