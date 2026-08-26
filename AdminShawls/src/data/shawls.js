// Shared product data used across Home, Men, Women, Springsummer, Featuredcoll and ProductDetail.
// Yeh single source of truth hai — isse duplicate data hatana bhi easy ho jaata hai.


export const shawls = [

];

// Helper functions taaki har page apna filtered subset easily le sake
export const homeShawls = shawls.filter((s) => s.id >= 1 && s.id <= 8);
export const menShawls = shawls.filter((s) => s.id >= 101 && s.id <= 106);
export const womenShawls = shawls.filter((s) => s.id >= 201 && s.id <= 206);
export const springShawls = shawls.filter((s) => s.id >= 301 && s.id <= 306);
export const featuredShawls = shawls.filter((s) => s.id >= 401 && s.id <= 406);
export const WeddingShawls = shawls.filter((s) => s.id >= "1111" && s.id <= "1116");
export const LuxuryShawls = shawls.filter((s) => s.id >= "1117" && s.id <= "1122");
export const FestiveShawls = shawls.filter((s) => s.id >= "1124" && s.id <= "1129");
export const BirthdayShawls = shawls.filter((s) => s.id >= "1131" && s.id <= "1133");
 