import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '@shared/api/productsApi';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const { data, error, isLoading, isFetching } = useGetAllProductsQuery({
    limit,
    skip,
    search: search || undefined,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке товаров</div>;

  return (
    <div>
      <h2>Товары</h2>
      
      {/* Поиск */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSkip(0); // Сбрасываем на первую страницу при поиске
          }}
          style={{
            padding: '8px',
            width: '300px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        {isFetching && <span>Поиск...</span>}
      </div>

      {/* Таблица товаров */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Фото</th>
            <th style={thStyle}>Название</th>
            <th style={thStyle}>Категория</th>
            <th style={thStyle}>Цена</th>
            <th style={thStyle}>Рейтинг</th>
            <th style={thStyle}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td style={tdStyle}>{product.title}</td>
              <td style={tdStyle}>{product.category}</td>
              <td style={tdStyle}>${product.price}</td>
              <td style={tdStyle}>{product.rating} ⭐</td>
              <td style={tdStyle}>
                <Link to={`/products/${product.id}`}>
                  <button style={buttonStyle}>Просмотр</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      {data && (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setSkip(prev => Math.max(0, prev - limit))}
            disabled={skip === 0}
            style={paginationButtonStyle}
          >
            Назад
          </button>
          
          <span>
            Страница: {Math.floor(skip / limit) + 1} / {Math.ceil(data.total / limit)}
          </span>
          
          <button
            onClick={() => setSkip(prev => prev + limit)}
            disabled={skip + limit >= data.total}
            style={paginationButtonStyle}
          >
            Вперед
          </button>

          <select 
            value={limit} 
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setSkip(0);
            }}
            style={{ padding: '5px' }}
          >
            <option value="5">5 на странице</option>
            <option value="10">10 на странице</option>
            <option value="20">20 на странице</option>
          </select>
        </div>
      )}
    </div>
  );
};

// Стили
const thStyle = {
  padding: '10px',
  textAlign: 'left' as const,
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '10px'
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#0066cc',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const paginationButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

export default ProductsPage;