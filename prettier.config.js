module.exports = {
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-tailwindcss"),
  ],
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  importOrder: [
    "^react$",
    "^next$",
    "^next/(.*)$",
    "^@/shared/(.*)$",
    "^@/pages/(.*)$",
    "^[./]",
    "<THIRD_PARTY_MODULES>",
  ],
  importOrderSortSpecifiers: true,
};
