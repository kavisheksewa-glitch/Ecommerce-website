# Merged Backend (Admin + Seller + Shawls)

Teeno backends (adminsBackend, sellerBackend, shawlsBackend) is ek project mein merge
kar diye gaye hain. Ab sirf ek `npm install`, ek `.env`, aur ek `node server.js` chalega.

## Setup

```bash
cd mergedBackend
npm install
```

`.env` file already bani hui hai, apni MongoDB URI check/update kar lein:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mergedDB
JWT_SECRET=change_this_to_a_strong_secret_key
```

Run:

```bash
npm run dev     # nodemon ke sath
# ya
npm start
```

## ⚠️ Zaroori Notes

1. **Database**: Teeno backend pehle alag-alag DB use kar rahe the
   (`e-commerce`, `kavi-shawls`, `seller`). Ab sab ek hi DB (`mergedDB`) mein
   ja rahe hain, alag collections ke sath (`admins`, `adminproducts`,
   `sellers`, `sellerproducts`, `shawlproducts`, `carts`). Purana data agar
   chahiye to manually migrate karna padega — fresh start karega to koi
   dikkat nahi.
2. **Product models rename kiye gaye hain** kyunki teeno projects mein
   `Product` naam ka schema tha lekin fields alag-alag the:
   - `AdminProduct` — adminsBackend ka simple product (title, category, price, image)
   - `SellerProduct` — sellerBackend ka detailed product (sellerId ke sath)
   - `ShawlProduct` — shawlsBackend ka product (stock ke sath)
3. **Single port**: Sab kuch ab port `5000` par chalega (`.env` se change kar sakte hain).
4. **uploads/**: Seller ke product images aur profile pictures ab is project
   ke apne `uploads/` folder mein save honge, aur `http://localhost:5000/uploads/...`
   se accessible honge.

## 🔁 Frontend URLs Update Karne Hain (IMPORTANT)

Teeno frontend projects mein jahan bhi `axios.get`/`fetch` calls hain, unke
base URL/paths ko neeche di gayi table ke hisaab se update kar dein:

### Admin Frontend

| Purana Endpoint              | Naya Endpoint                     |
|-------------------------------|------------------------------------|
| POST `/api/admin/login`       | POST `/api/admin/login` (same)     |
| POST `/api/admin/register`    | POST `/api/admin/register` (same)  |
| GET  `/api/products`          | GET  `/api/admin/products`         |
| POST `/api/products`          | POST `/api/admin/products`         |
| DELETE `/api/products/:id`    | DELETE `/api/admin/products/:id`   |

### Seller Frontend

| Purana Endpoint                     | Naya Endpoint                            |
|---------------------------------------|--------------------------------------------|
| POST `/api/auth/register`             | POST `/api/seller/auth/register`           |
| POST `/api/auth/login`                | POST `/api/seller/auth/login`              |
| GET  `/api/auth/seller/:id`           | GET  `/api/seller/auth/seller/:id`         |
| PUT  `/api/auth/seller/:id`           | PUT  `/api/seller/auth/seller/:id`         |
| POST `/api/products/add`              | POST `/api/seller/products/add`            |
| GET  `/api/products`                  | GET  `/api/seller/products`                |

### Shawls (Customer) Frontend

| Purana Endpoint                       | Naya Endpoint                             |
|-----------------------------------------|----------------------------------------------|
| POST `/api/products/add` (ya jo bhi tha)| POST `/api/shawls/products/add`               |
| GET  `/api/products/products`           | GET  `/api/shawls/products/products`          |
| POST `/api/cart/add`                    | POST `/api/shawls/cart/add`                   |
| GET  `/api/cart/:userId`                | GET  `/api/shawls/cart/:userId`               |
| DELETE `/api/cart/remove/:id`           | DELETE `/api/shawls/cart/remove/:id`          |

Sabse aasan tarika: har frontend project mein jahan `axios.create({baseURL: ...})`
ya `const BASE_URL = "http://localhost:XXXX"` likha hai, wahan ek common
`http://localhost:5000` set kar dein aur upar table ke naye paths use karein.

## Folder Structure

```
mergedBackend/
├── config/db.js
├── models/
│   ├── Admin.js
│   ├── AdminProduct.js
│   ├── Seller.js
│   ├── SellerProduct.js
│   ├── ShawlProduct.js
│   └── Cart.js
├── controllers/
│   ├── sellerAuthController.js
│   └── sellerProductController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── adminRoutes.js
│   ├── sellerAuthRoutes.js
│   ├── sellerProductRoutes.js
│   ├── shawlProductRoutes.js
│   └── cartRoutes.js
├── uploads/
├── server.js
├── package.json
└── .env
```
