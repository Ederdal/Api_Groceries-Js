import Product from '../models/products.model.js'

const productDAO = {}

productDAO.getAll = async () => {
    const products = await Product.find();
    return products;
};

productDAO.getOne = async (barcode) => {
    const product = await Product.findOne({ barcode: barcode });
    return product;
}

productDAO.insertOne = async (product) => {
    try {
        return await Product.create(product);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.barcode) {
            return { error: "El código de barras ya está en uso" };
        } else {
            throw error;
        }
    }
};


productDAO.deleteOne = async (barcode) => {
    try {
        const result = await Product.deleteOne({ barcode: barcode });
        // Verificar si se eliminó un producto
        if (result.deletedCount === 1) {
            return { message: 'Product deleted successfully' };
        } else {
            return { message: 'Product not found' };
        }
    } catch (error) {
        return { error: error.message };
    }
};

productDAO.updateOne = async (barcode, product) => {
    return await Product.findOneAndUpdate({ barcode: barcode }, product);
};

export default productDAO;
