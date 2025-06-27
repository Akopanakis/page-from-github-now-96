# kostopro

Το **kostopro** είναι ένα project βασισμένο στο **Vite** και το **React**. Αναπτύσσεται και φιλοξενείται εύκολα στο **Vercel**.

## Οδηγίες

1. Εγκατάσταση εξαρτήσεων
   ```bash
   npm install
   ```
2. Έλεγχος κώδικα (lint)
   ```bash
   npm run lint
   ```
3. Εκτέλεση unit tests
   ```bash
   npm test
   ```
4. Εκτέλεση σε περιβάλλον ανάπτυξης
   ```bash
   npm run dev
   ```
5. Δημιουργία παραγωγικού build
   ```bash
   npm run build
   ```
6. Deploy στο Vercel
   Κάντε push το repository στο GitHub και το Vercel θα αναλάβει αυτόματα το deployment.

## Μεταβλητές Περιβάλλοντος

Χρησιμοποιήστε `.env` τοπικά και `.env.production` στο Vercel για να ορίσετε μεταβλητές όπως:

```ini
VITE_API_URL=https://api.example.com
```

## Δομή Φακέλων

```
src/
├─ components/
├─ hooks/
├─ utils/
└─ assets/
```
