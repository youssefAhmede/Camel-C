// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { camelc } from './json';  // استيراد البيانات من ملف JSON

// const CategoryDetails = () => {
//   const { category } = useParams();  // الحصول على اسم الفئة من الرابط
//   const items = camelc[category];  // الحصول على البيانات الخاصة بالفئة

//   return (
//     <div>
//       <h1>{category.toUpperCase()} Details</h1>
//       <div className="items-container">
//         {items.map((item) => (
//           <div key={item.id} className="item-card">
//             <h3>{item.name}</h3>
//             <p>{item.firstLast}</p>
//             <p><strong>Date:</strong> {item.date}</p>
//             <button>{item.nameButton}</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryDetails;
