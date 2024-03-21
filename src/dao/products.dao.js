import Product from '../models/products.model.js'

const productDAO = {};

productDAO.getAll = async () => {
    const products = await Product.find();
    return products;
};

productDAO.getOne = async (barcode) => {
    const product = await Product.findOne({ barcode: barcode });
    return product;
};

productDAO.insertOne = async (product) => {
    return await Product.create(product);
};

productDAO.deleteOne = async (barcode) => {
    try {
        const product = await Product.findOne({ barcode: barcode });
        if (!product) {
            // Si el producto no se encuentra en la base de datos
            return null;
        }
        await product.remove(); // Elimina el producto de la base de datos
        // Producto eliminado con éxito
        return { message: 'Product deleted successfully' };
    } catch (error) {
        // Error al intentar eliminar el producto
        throw new Error('Failed to delete product');
    }
};

productDAO.updateOne = async (barcode, product) => {
    return await Product.findOneAndUpdate({ barcode: barcode }, product);
};

export default productDAO;
