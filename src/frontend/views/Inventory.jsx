import React, { useState, useEffect, useRef } from 'react';

const Inventory = () => {
    const [showModal, setShowModal] = useState(false);
    const [inventory, setInventory] = useState([
        {
            sku: 'MON-LG-27-004',
            name: 'Monitor LG 27" 4K',
            category: 'Electrónica',
            price: 450.00,
            stock: 3,
            status: 'critical'
        },
        {
            sku: 'KEY-MEC-001',
            name: 'Teclado Mecánico RGB',
            category: 'Accesorios',
            price: 85.00,
            stock: 120,
            status: 'ok'
        }
    ]);
    const formRef = useRef(null);

    // Initial load for validation script if it exists globally
    useEffect(() => {
        // Re-run validation init if functionality is available and modal opens
        if (showModal && window.Validation) {
            // Small timeout to ensure DOM is ready
            setTimeout(() => {
                window.Validation.validateForm(formRef.current); // Initial check or bind
                // If Validation.init() attaches listeners, we might need to manualy attach since we are in React
                // But for now, let's assume we use the script logic.
            }, 100);
        }
    }, [showModal]);

    const handleSave = (e) => {
        e.preventDefault();

        // Use the existing validation logic if available
        let isValid = true;

        /* 
           NOTE: Because we are in React, we would typically handle validation state here.
           However, to use the requested "validation.js", we invoke it.
           If validation.js is loaded in the parent HTML, 'Validation' might be global.
           If not, we implement a fallback check here or need to import it.
        */

        if (window.Validation) {
            isValid = window.Validation.validateForm(formRef.current);
        } else {
            // Fallback: Check validity using native HTML5 API
            isValid = formRef.current.checkValidity();
            if (!isValid) formRef.current.reportValidity();
        }

        if (isValid) {
            const formData = new FormData(formRef.current);
            const newProduct = {
                sku: formData.get('sku'),
                name: formData.get('nombre'),
                category: 'Generico', // Hardcoded for demo
                price: parseFloat(formData.get('precio')),
                stock: parseInt(formData.get('stock')),
            };

            // Determine status
            if (newProduct.stock < 5) newProduct.status = 'critical';
            else if (newProduct.stock < 15) newProduct.status = 'low';
            else newProduct.status = 'ok';

            setInventory([...inventory, newProduct]);
            setShowModal(false);
            alert('Producto guardado correctamente (Simulacion React)');
        }
    };

    const getStatusBadge = (status) => {
        const config = {
            'ok': { label: 'Stock Normal', class: 'status-ok' },
            'low': { label: 'Stock Bajo', class: 'status-low' },
            'critical': { label: 'Stock Crítico', class: 'status-critical' }
        };
        const s = config[status] || config['ok'];
        return <span className={`badge ${s.class}`}>{s.label}</span>;
    };

    return (
        <div className="container">
            {/* Inline Styles from estilos.css */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --primary-color: #4F46E5;
                    --primary-hover: #4338CA;
                    --secondary-color: #64748B;
                    --background-color: #F8FAFC;
                    --surface-color: #FFFFFF;
                    --text-primary: #1E293B;
                    --text-secondary: #64748B;
                    --border-color: #E2E8F0;
                    --danger-color: #EF4444;
                    --success-color: #10B981;
                    --warning-color: #F59E0B;
                    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    --radius: 0.5rem;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--background-color);
                    color: var(--text-primary);
                    margin: 0;
                    padding: 0;
                    line-height: 1.5;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .section-header {
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .section-header h1 {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }

                .section-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .inventory-controls {
                    display: flex;
                    gap: 1rem;
                    background: var(--surface-color);
                    padding: 1.5rem;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow-sm);
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .inventory-controls input,
                .inventory-controls select {
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius);
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s;
                    flex-grow: 1;
                }

                .inventory-controls input:focus,
                    .inventory-controls select:focus {
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }

                #searchSKU { flex-grow: 2; }

                .btn-primary {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: var(--radius);
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .btn-primary:hover { background-color: var(--primary-hover); }

                .btn-secondary {
                    background-color: white;
                    color: var(--text-secondary);
                    border: 1px solid var(--border-color);
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius);
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .btn-secondary:hover {
                    background-color: var(--background-color);
                    color: var(--text-primary);
                }

                .table-container {
                    background: var(--surface-color);
                    border-radius: var(--radius);
                    box-shadow: var(--shadow-md);
                    overflow: hidden;
                    overflow-x: auto;
                }

                .inventory-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .inventory-table th {
                    background-color: #F1F5F9;
                    padding: 1rem;
                    font-weight: 600;
                    color: var(--secondary-color);
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid var(--border-color);
                }

                .inventory-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-color);
                    vertical-align: middle;
                }

                .inventory-table tr:last-child td { border-bottom: none; }
                .inventory-table tr:hover { background-color: #F8FAFC; }

                .img-thumb {
                    width: 48px;
                    height: 48px;
                    object-fit: cover;
                    border-radius: 4px;
                    background-color: #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    font-size: 10px;
                }

                .badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .status-ok { background-color: #D1FAE5; color: #065F46; }
                .status-low { background-color: #FEF3C7; color: #92400E; }
                .status-critical { background-color: #FEE2E2; color: #991B1B; }

                .btn-icon {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.1rem;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                }

                .btn-edit { color: var(--primary-color); }
                .btn-delete { color: var(--danger-color); }
                .btn-icon:hover { background-color: #F1F5F9; }

                .modal-overlay {
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content {
                    background-color: var(--surface-color);
                    padding: 2rem;
                    border-radius: var(--radius);
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
                    animation: scaleIn 0.3s ease;
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0.95); } to { transform: scale(1); } }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .modal-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                }

                .close-modal {
                    font-size: 1.5rem;
                    color: var(--text-secondary);
                    cursor: pointer;
                    background: none;
                    border: none;
                }

                .form-group { margin-bottom: 1.25rem; }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .form-group input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius);
                    box-sizing: border-box;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }

                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                /* Validation styles for JS */
                input.invalid {
                    border-color: var(--danger-color);
                    background-color: #FEF2F2;
                }
                .error-message {
                    color: var(--danger-color);
                    font-size: 0.85rem;
                    margin-top: 0.25rem;
                }
            `}</style>

            <header className="section-header">
                <h1>Gestión de Inventario</h1>
                <p>Administra y controla todos los productos de tu inventario</p>
            </header>

            <div className="inventory-controls">
                <input type="text" id="searchSKU" placeholder="🔍 Buscar por nombre o SKU..." />
                <select id="filterCategory">
                    <option value="">Todas las categorías</option>
                    <option value="electronica">Electrónica</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                <select id="filterStatus">
                    <option value="">Todos los estados</option>
                    <option value="ok">Stock Normal</option>
                    <option value="low">Stock Bajo</option>
                    <option value="critical">Stock Crítico</option>
                </select>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <span>+</span> Agregar Producto
                </button>
            </div>

            <div className="table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Imagen</th>
                            <th>Nombre del Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="inventoryBody">
                        {inventory.map((item, index) => (
                            <tr key={index}>
                                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.sku}</td>
                                <td><div className="img-thumb">IMG</div></td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.stock} uds.</td>
                                <td>{getStatusBadge(item.status)}</td>
                                <td>
                                    <button className="btn-icon btn-edit" title="Editar">✎</button>
                                    <button className="btn-icon btn-delete" title="Eliminar">🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Nuevo Producto</h2>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>

                        <form ref={formRef} className="validate-form" onSubmit={handleSave} noValidate>
                            <div className="form-group">
                                <label htmlFor="inputSKU">SKU</label>
                                <input
                                    type="text"
                                    id="inputSKU"
                                    name="sku"
                                    placeholder="Ej: ABC-123-000"
                                    required
                                    pattern="^[A-Z]{3}-\d{3}-\d{3}$"
                                    title="Formato: AAA-000-000"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputNombre">Nombre del Producto</label>
                                <input
                                    type="text"
                                    id="inputNombre"
                                    name="nombre"
                                    placeholder="Nombre descriptivo"
                                    required
                                    minLength="3"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputPrecio">Precio ($)</label>
                                <input
                                    type="number"
                                    id="inputPrecio"
                                    name="precio"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputStock">Stock Inicial</label>
                                <input
                                    type="number"
                                    id="inputStock"
                                    name="stock"
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Guardar Producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
