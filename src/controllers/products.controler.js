import productDAO from "../dao/products.dao.js";

export const getAll = (req, res) => {
  productDAO.getAll()
    .then(products => {
      res.json({ products });
    })
    .catch(err => res.status(500).json({
      status: "Server unavailable",
      error: err.message // Acceso al mensaje de error
    }));
};

export const getOne = (req, res) => {
  productDAO.getOne(req.params.barcode)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found :/"
        });
      }
      res.json({ product });
    })
    .catch(err => res.status(500).json({
      status: "Server unavailable",
      error: err.message // Acceso al mensaje de error
    }));
};

export const insertOne = (req, res) => {
  productDAO.insertOne(req.body)
    .then(result => {
      console.log("Producto guardado");
      res.json({ message: "Producto guardado exitosamente" }); // Respuesta JSON sin URL de redirección
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ 
        status: "Server unavailable", 
        error: err.message // Acceso al mensaje de error
      }); 
    });
};



export const deleteOne = (req, res) => {
  productDAO.deleteOne(req.params.barcode)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Product not found :/"
        });
      }
      // Si el producto se eliminó correctamente, devuelve un mensaje de éxito
      res.status(200).json({
        message: "Product deleted successfully"
      });
    })
    .catch(err => { 
      console.error(err);
      res.status(500).json({ 
        status: "Server unavailable", 
        error: err.message // Acceso al mensaje de error
      }); 
    });
};


export const updateOne = (req, res) => {
  const barcode = req.params.barcode; 
  const updatedData = req.body; 

  productDAO.updateOne(barcode, updatedData) 
      .then(updatedProduct => {
          if (!updatedProduct) { 
              return res.status(404).json({
                  message: "Product not found"
              });
          }
          res.status(200).json(updatedProduct); 
      })
      .catch(err => { 
          console.error("Error updating product:", err);
          res.status(500).json({ error: "Internal server error" });
      });
};
