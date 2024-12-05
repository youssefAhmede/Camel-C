

// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { camelc } from './json'; // استيراد البيانات من ملف JSON

// const ArticleDetail = () => {
//   const { type, id } = useParams(); // الحصول على النوع و id من الرابط
//   const items = camelc[type]; // الحصول على جميع العناصر الخاصة بالنوع
//   const currentItem = items?.find((item) => item.id === parseInt(id)); // العثور على العنصر الحالي
//   const relatedItems = items?.filter((item) => item.id !== parseInt(id)); // العناصر الأخرى
// // ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ


// // ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
//   if (!currentItem) {
//     return <div>Item not found!</div>;
//   }

//   return (
//     <div>
//       {/* تفاصيل العنصر الحالي */}
//       <div className="current-item">
//         <h2>{currentItem.name} Details</h2>
//         <p><strong>First/Last:</strong> {currentItem.content}</p>
//         <p><strong>Date:</strong> {currentItem.date}</p>
//         <p><strong>Button Name:</strong> {currentItem.type}</p>
//       </div>

//       {/* العناصر المشابهة */}
//       <div className="related-items">
//         <h2>مقالات مشابهة</h2>
//         <div className="items-container">
//           {relatedItems.map((item) => (
//             <div key={item.id} className="item-card">
//               <h3>{item.name}</h3>
//               <p>{item.content}</p>
//               <p><strong>Date:</strong> {item.date}</p>
//               {/* رابط يوجه إلى صفحة ArticleDetail لهذا العنصر */}
//               <Link to={`/${type}/${item.id}`}>
//                 <button>{item.type}</button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleDetail;


import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { camelc } from './json'; // استيراد البيانات من ملف JSON

const ArticleDetail = () => {
  const { type, id } = useParams(); // الحصول على النوع و id من الرابط
  const items = camelc[type]; // الحصول على جميع العناصر الخاصة بالنوع
  const currentItem = items?.find((item) => item.id === parseInt(id)); // العثور على العنصر الحالي
  const relatedItems = items?.filter((item) => item.id !== parseInt(id)); // العناصر الأخرى

  const [isExpanded, setIsExpanded] = useState(false); // حالة لتوسيع النص

  if (!currentItem) {
    return <div>Item not found!</div>;
  }

  // دالة لتقصير النص
  const cutContent = (content) => {
    const words = content.split(" "); // تقسيم النص إلى كلمات
    return words.length > 4 ? words.slice(0, 4).join(" ") + " ..." : content;
  };

  const cutContentInLoop = (content) => {
    const words = content.split(" "); // تقسيم النص إلى كلمات
    return words.length > 4 ? words.slice(0, 4).join(" ") + " ..." : content;
  };

  // دالة لاستبدال الروابط داخل النص بـ "click here"
  const replaceLinks = (content) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g; // التعبير المنتظم لاكتشاف الروابط
    const linkText = isArabic(currentItem.name) ? "اضغط هنا" : "Click here";
    return content.replace(linkRegex, (url) => `<a class="click-here" href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
  };
  // const isArabicText = useMemo(() => isArabic(certificate?.name), [certificate]);
  function isArabic(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
}
  return (
    <div>
      {/* تفاصيل العنصر الحالي */}
        <h2 className="title">{currentItem.name}</h2>
      <div dir={isArabic(currentItem.name) ? "rtl" : "ltr"} 
      className="current-item">
        <p>
          <small>
          {isArabic(currentItem.name)
                  ? `تاريخ: ${currentItem.date}`
                  : `Date: ${currentItem.date}`
          }
            </small> 
        </p>
        <p>
          <strong>
          {/* <strong>Content:</strong>{" "} */}
          <span
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? replaceLinks(currentItem.content)
                : replaceLinks(cutContent(currentItem.content)),
            }}
          />
          </strong>
        </p>
        <button className='hide' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded 
            ? isArabic(currentItem.name)
              ? "إخفاء المقال"
              : "Hide the article"
            : isArabic(currentItem.name)
            ? "أكمل قراءة المقال"
            : "Continue reading the article"}
        </button>
        
        <p>
          <small>
          {isArabic(currentItem.name)
            ? `فئة: ${currentItem.type}`
            : `Category: ${currentItem.type}`
    }
    </small>
        </p>
      </div>
      <hr />
      {/* العناصر المشابهة */}
      <div>
        <h2 className="similar">
      {isArabic(currentItem.name)
            ? "مقالات مشابهة"
            : "Similar Articles"
    }
    </h2>
        
        <div className="items-container">
          {relatedItems.map((item) => (
            <div key={item.id} className="item-card">
              <p>
                {item.type}
              </p>
              <h3>{item.name}</h3>
              <p>{cutContentInLoop(item.content)}</p>
              <p>
                {item.date}
              </p>
              {/* رابط يوجه إلى صفحة ArticleDetail لهذا العنصر */}
              <Link to={`/${type}/${item.id}`}>
                <button>
                { isArabic(currentItem.name)
                  ? "عرض"
                  : "View"
                }
                  </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
