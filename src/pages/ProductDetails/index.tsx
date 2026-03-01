import { useParams, Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '@shared/api/productsApi';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки товара</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div>
      <Link to="/products">← Назад к списку</Link>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={product.thumbnail} 
            alt={product.title}
            style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
          />
        </div>
        
        <div style={{ flex: 2 }}>
          <h2>{product.title}</h2>
          <p><strong>Категория:</strong> {product.category}</p>
          <p><strong>Бренд:</strong> {product.brand}</p>
          <p><strong>Цена:</strong> ${product.price}</p>
          <p><strong>Скидка:</strong> {product.discountPercentage}%</p>
          <p><strong>Рейтинг:</strong> {product.rating} ⭐</p>
          <p><strong>В наличии:</strong> {product.stock} шт.</p>
          <p><strong>Описание:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;