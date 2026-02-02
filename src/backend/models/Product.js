const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        // Identificador único interno
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // Código único de inventario
        sku: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        // Nombre descriptivo
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        // Descripción técnica
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // Categorías del producto
        category: {
            type: DataTypes.ENUM('Electrónica', 'Oficina', 'Accesorios', 'Mobiliario', 'Software'),
            allowNull: false
        },
        // Precio
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        // Stock disponible
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        // URL de la imagen
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        // Estado del producto
        status: {
            type: DataTypes.STRING(20),
            defaultValue: 'En Stock'
        }
    }, {
        tableName: 'products', // Nombre de la tabla en la DB
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // Índices adicionales si son necesarios
        indexes: [
            {
                unique: true,
                fields: ['sku']
            },
            {
                fields: ['name']
            }
        ]
    });

    return Product;
};