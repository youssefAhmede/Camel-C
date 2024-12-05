import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { camelc } from './json';  // استيراد البيانات من ملف JSON
import './dark_mode.css'; // استيراد ملف CSS

const ItemDetail = () => {
  const { type } = useParams();  // الحصول على نوع العنصر من الرابط
  const items = camelc[type];  // الحصول على العناصر الخاصة بالنوع

  // دالة لتقصير النص
  const cutContent_in_loop = (content) => {
    const words = content.split(" "); // تقسيم النص إلى كلمات
    return words.length > 4 ? words.slice(0, 4).join(" ") + " ..." : content;
  };

  return (
    <div>
      <h1 className='title'>{type.toUpperCase()}</h1>
      <div className="items-container">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h6>{item.type}</h6>
            <h3>{item.name}</h3>
            {/* استخدام الدالة لتقصير النص */}
            <p>{cutContent_in_loop(item.content)}</p>
            <p><strong>Date:</strong> {item.date}</p>
            {/* رابط يوجه إلى صفحة ArticleDetail لهذا العنصر */}
            <Link to={`/${type}/${item.id}`}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetail;

