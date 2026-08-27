-- Cloudflare D1 SQL Database Schema for AllWordTools

-- 1. Categories
CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

-- 2. Category Translations
CREATE TABLE IF NOT EXISTS category_translations (
  category_slug TEXT NOT NULL,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (category_slug, locale),
  FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);

-- 3. Tools
CREATE TABLE IF NOT EXISTS tools (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  is_new INTEGER DEFAULT 0,
  is_trending INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);

-- 4. Tool Translations
CREATE TABLE IF NOT EXISTS tool_translations (
  tool_slug TEXT NOT NULL,
  locale TEXT NOT NULL,
  name TEXT,
  meta_title TEXT,
  meta_description TEXT,
  eyebrow TEXT,
  heading TEXT,
  subheading TEXT,
  intro_json TEXT,
  howto_title TEXT,
  howto_steps_json TEXT,
  sections_json TEXT,
  examples_json TEXT,
  tips_json TEXT,
  faqs_json TEXT,
  search_intent TEXT,
  keywords_json TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tool_slug, locale),
  FOREIGN KEY (tool_slug) REFERENCES tools(slug) ON DELETE CASCADE
);

-- 5. User Accounts & Favorites (Future Ready)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  favorites_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for ultra-fast edge lookup
CREATE INDEX IF NOT EXISTS idx_tool_trans_locale ON tool_translations(locale);
CREATE INDEX IF NOT EXISTS idx_cat_trans_locale ON category_translations(locale);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_slug);
