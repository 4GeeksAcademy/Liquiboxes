import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faTshirt, faShoePrints, faPalette, faTextHeight, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import "../../styles/signup.css";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [signupData, setSignUpData] = useState({
    name: "",
    surname: "",
    gender: "",
    address: "",
    postalCode: "",
    email: "",
    password: "",
    upperSize: "",
    lowerSize: "",
    cupSize: "",
    shoeSize: "",
    notColors: [],
    stamps: "",
    fit: "",
    notClothes: [],
    categories: [],
    profession: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setSignUpData(prev => ({
          ...prev,
          [name]: [...prev[name], value].slice(0, name === 'categories' ? 5 : 3)
        }));
      } else {
        setSignUpData(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setSignUpData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el campo de categorias tiene al menos una opción seleccionada
    if (signupData.categories.length === 0) {
      alert(`Por favor selecciona al menos una categoria`);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/users/register`,
        signupData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Usuario registrado:", response.data);
      navigate("/");
    } catch (error) {
      console.log("Ha habido un error: " + error);
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return signupData.name && signupData.surname && signupData.gender && signupData.address && signupData.postalCode;
      case 2:
        return signupData.email && signupData.password;
      case 3:
        return signupData.upperSize && signupData.lowerSize && signupData.shoeSize;
      case 4:
        return signupData.stamps && signupData.fit;
      case 5:
        return true; // Este paso no tiene campos requeridos
      case 6:
        return signupData.categories.length > 0 && signupData.profession;
      default:
        return false;
    }
  };

  useEffect(() => {
    setIsStepValid(validateStep());
  }, [signupData, step]);

  const nextStep = () => {
    if (isStepValid) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faUser} /> Datos Personales</h3>
              <p>Por favor, ingresa tus datos personales básicos.</p>
            </div>
            <div className="step-form">
              <input type="text" name="name" value={signupData.name} onChange={handleChange} placeholder="Nombre" required />
              <input type="text" name="surname" value={signupData.surname} onChange={handleChange} placeholder="Apellido" required />
              <select name="gender" value={signupData.gender} onChange={handleChange} required>
                <option value="">Selecciona género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no_especificado">Prefiero no decirlo</option>
              </select>
              <input type="text" name="address" value={signupData.address} onChange={handleChange} placeholder="Dirección" required />
              <input type="text" name="postalCode" value={signupData.postalCode} onChange={handleChange} placeholder="Código Postal" required />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faEnvelope} /> Datos de Cuenta</h3>
              <p>Ingresa tu correo electrónico y una contraseña segura.</p>
            </div>
            <div className="step-form">
              <input type="email" name="email" value={signupData.email} onChange={handleChange} placeholder="Email" required />
              <input type="password" name="password" value={signupData.password} onChange={handleChange} placeholder="Contraseña" required />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faTshirt} /> Tallas</h3>
              <p>Selecciona tus tallas para ayudarnos a personalizar tu experiencia.</p>
            </div>
            <div className="step-form">
              <select name="upperSize" value={signupData.upperSize} onChange={handleChange} required>
                <option value="">Talla Superior</option>
                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <select name="lowerSize" value={signupData.lowerSize} onChange={handleChange} required>
                <option value="">Talla Inferior</option>
                {Array.from({ length: 35 }, (_, i) => i + 26).map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <select name="cupSize" value={signupData.cupSize} onChange={handleChange}>
                <option value="">Talla de Gorra</option>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <select name="shoeSize" value={signupData.shoeSize} onChange={handleChange} required>
                <option value="">Talla de Zapato (EU)</option>
                {Array.from({ length: 27 }, (_, i) => i + 28).map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faPalette} /> Preferencias de Estilo</h3>
              <p>Cuéntanos sobre tus preferencias de estilo para ofrecerte mejores recomendaciones.</p>
            </div>
            <div className="step-form">
              <div className="checkbox-group">
                <p>Colores que menos te gustan (máximo 3):</p>
                {['Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Morado', 'Rosa', 'Marrón', 'Negro', 'Blanco'].map(color => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      name="notColors"
                      value={color}
                      checked={signupData.notColors.includes(color)}
                      onChange={handleChange}
                      disabled={signupData.notColors.length >= 3 && !signupData.notColors.includes(color)}
                    /> {color}
                  </label>
                ))}
              </div>
              <select name="stamps" value={signupData.stamps} onChange={handleChange} required>
                <option value="">Preferencia de Estampado</option>
                <option value="estampados">Estampados</option>
                <option value="lisos">Lisos</option>
              </select>
              <select name="fit" value={signupData.fit} onChange={handleChange} required>
                <option value="">Preferencia de Ajuste</option>
                <option value="ajustado">Ajustado</option>
                <option value="holgado">Holgado</option>
              </select>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faTextHeight} /> Preferencias de Ropa</h3>
              <p>Indícanos qué tipos de prendas prefieres evitar.</p>
            </div>
            <div className="step-form">
              <div className="checkbox-group">
                <p>Prendas que menos te gustan (máximo 3):</p>
                {['Camisetas', 'Pantalones', 'Faldas', 'Vestidos', 'Chaquetas', 'Abrigos', 'Zapatos', 'Accesorios', 'Ropa Interior', 'Trajes'].map(item => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      name="notClothes"
                      value={item}
                      checked={signupData.notClothes.includes(item)}
                      onChange={handleChange}
                      disabled={signupData.notClothes.length >= 3 && !signupData.notClothes.includes(item)}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <div className="step-info">
              <h3><FontAwesomeIcon icon={faBriefcase} /> Categorías y Profesión</h3>
              <p>Selecciona las categorías con las que te identificas y tu profesión.</p>
            </div>
            <div className="step-form">
              <div className="checkbox-group">
                <p>Categorías con las que te identificas (máximo 5):</p>
                {['Moda', 'Ropa de Trabajo', 'Tecnología', 'Carpintería', 'Outdoor', 'Deporte', 'Arte', 'Cocina', 'Jardinería', 'Música', 'Viajes', 'Lectura', 'Cine', 'Fotografía', 'Yoga'].map(category => (
                  <label key={category}>
                    <input
                      type="checkbox"
                      name="categories"
                      value={category}
                      checked={signupData.categories.includes(category)}
                      onChange={handleChange}
                      disabled={signupData.categories.length >= 5 && !signupData.categories.includes(category)}
                    /> {category}
                  </label>
                ))}
              </div>
              <select name="profession" value={signupData.profession} onChange={handleChange} required>
                <option value="">Selecciona tu profesión</option>
                {['Salud', 'Informática', 'Educación', 'Ingeniería', 'Artes', 'Finanzas', 'Ventas', 'Administración', 'Construcción', 'Hostelería', 'Estudiante', 'Otro'].map(prof => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container min-height-vh">
      <form onSubmit={handleSubmit}>
        <div className="signup-content">
          {renderStep()}
        </div>
        <div className="navigation-buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Anterior</button>}
          {step < 6 ? (
            <button 
              type="button" 
              onClick={nextStep} 
              disabled={!isStepValid}
              className={isStepValid ? "button-enabled" : "button-disabled"}
            >
              Siguiente
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={!isStepValid}
              className={isStepValid ? "button-enabled" : "button-disabled"}
            >
              Registrarse
            </button>
          )}
        </div>
      </form>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 6) * 100}%`}}></div>
      </div>
    </div>
  );
}