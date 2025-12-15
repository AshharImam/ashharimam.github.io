# 🧹 Cleanup Guide - Remove Unnecessary Files

Since you've converted to React + Vite, these files are **no longer needed** and can be safely deleted:

## ❌ Files to Delete

### 1. **Old Vanilla JavaScript Files**

```
✗ index.html          → Old vanilla JS version (use index-react.html instead)
✗ script.js           → Old vanilla JS code (now in React components)
✗ styles.css          → Old CSS (now split into component CSS files)
```

### 2. **Duplicate Files**

```
✗ assets/             → Duplicate (already in public/assets/)
✗ projects.json       → Duplicate (already in public/projects.json)
```

### 3. **Optional Documentation** (keep if you want reference)

```
? MIGRATION-GUIDE.md  → Keep if you want reference, delete if not needed
? SETUP-INSTRUCTIONS.md → Keep for now, delete later if not needed
```

## ✅ Files to Keep

### Essential React Files

```
✓ src/                → All React source code
✓ public/             → Static assets (projects.json, assets/)
✓ package.json        → Dependencies
✓ vite.config.js      → Vite configuration
✓ vercel.json         → Vercel deployment config
✓ .eslintrc.cjs       → Code linting
✓ .gitignore          → Git ignore rules
```

### Documentation (Keep)

```
✓ README-REACT.md     → Main documentation
✓ QUICK-START.md      → Quick reference
```

## 🔄 Files to Rename

### For Vite to Work Properly:

```
index-react.html → index.html
```

**Why?** Vite looks for `index.html` in the root by default. You can either:

1. Rename `index-react.html` to `index.html` (recommended)
2. Or update `vite.config.js` to point to `index-react.html`

## 📝 Quick Cleanup Commands

### PowerShell (Windows):

```powershell
# Delete old files
Remove-Item index.html
Remove-Item script.js
Remove-Item styles.css
Remove-Item -Recurse -Force assets
Remove-Item projects.json

# Rename React HTML file
Rename-Item index-react.html index.html
```

### Bash (Mac/Linux):

```bash
# Delete old files
rm index.html script.js styles.css
rm -rf assets
rm projects.json

# Rename React HTML file
mv index-react.html index.html
```

## 🎯 After Cleanup

Your project structure should look like:

```
Ashhar-Portfolio/
├── public/
│   ├── assets/
│   └── projects.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html          ← Renamed from index-react.html
├── package.json
├── vite.config.js
├── vercel.json
├── .eslintrc.cjs
├── .gitignore
├── README-REACT.md
└── QUICK-START.md
```

## ⚠️ Important Notes

1. **Backup First**: If you want to keep the old version, create a backup branch:

   ```bash
   git checkout -b backup-vanilla-js
   git add .
   git commit -m "Backup vanilla JS version"
   git checkout main
   ```

2. **Test Before Deleting**: Make sure React version works:

   ```bash
   npm run dev
   ```

3. **Keep Documentation**: Consider keeping migration guides if you might reference them later.

## ✅ Verification

After cleanup, verify everything works:

```bash
npm install
npm run dev
npm run build
```

If all commands work, you're good to go! 🎉
