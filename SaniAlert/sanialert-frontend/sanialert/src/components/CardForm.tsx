import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createCard } from '../store/cardSlice';
import type { CardCreateDTO } from '../types/card';
import Toast from './Toast';
import './CardForm.css';

interface CardFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<CardCreateDTO>({
    technicalResponsible: '',
    date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0],
    turbidity: 0.5,
    dissolvedOxygen: 5.0,
    heavyMetalsPresent: false,
    heavyMetalsLevel: undefined,
    residuesDetected: false,
    residuesDescription: undefined,
    ph: 7.0
  });

  const [errors, setErrors] = useState({
    technicalResponsible: '',
    turbidity: '',
    dissolvedOxygen: '',
    heavyMetalsLevel: '',
    ph: '',
    residuesDescription: '' 
  });

  const [showToast, setShowToast] = useState(false); 

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = {
      technicalResponsible: '',
      turbidity: '',
      dissolvedOxygen: '',
      heavyMetalsLevel: '',
      ph: '',
      residuesDescription: '' 
    };

    if (!formData.technicalResponsible.trim()) {
      newErrors.technicalResponsible = 'Responsável técnico é obrigatório';
      isValid = false;
    }

    if (formData.turbidity < 0) {
      newErrors.turbidity = 'Turbidez não pode ser negativa';
      isValid = false;
    }

    if (formData.dissolvedOxygen < 0) {
      newErrors.dissolvedOxygen = 'Oxigênio dissolvido não pode ser negativo';
      isValid = false;
    }

    if (formData.heavyMetalsPresent &&
        (formData.heavyMetalsLevel === undefined || formData.heavyMetalsLevel < 0)) {
      newErrors.heavyMetalsLevel = 'Informe o nível de metais pesados (não negativo)';
      isValid = false;
    }

    if (formData.ph < 0) {
      newErrors.ph = 'pH não pode ser negativo';
      isValid = false;
    }

    if (formData.residuesDetected && (!formData.residuesDescription || !formData.residuesDescription.trim())) {
      newErrors.residuesDescription = 'Descrição dos resíduos é obrigatória quando resíduos são detectados';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setShowToast(true); 
    }
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        ...(name === 'heavyMetalsPresent' && !checked && { heavyMetalsLevel: undefined }),
        ...(name === 'residuesDetected' && !checked && { residuesDescription: undefined })
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(false); 
    if (validate()) {
      try {
        await dispatch(createCard(formData)).unwrap();
        if (onSuccess) {
          onSuccess(); 
        }
        onClose(); 
      } catch (error) {
        console.error('Failed to create card:', error);
      }
    } else {
      setShowToast(true); 
    }
  };

  return (
    <div className="card-form-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2>Cadastrar parâmetros de qualidade da água</h2>
        <div className="form-row">
          <div className="form-group form-group-large">
            <label htmlFor="technicalResponsible">Responsável Técnico <span className="required-asterisk">*</span></label>
            <input
              type="text"
              id="technicalResponsible"
              name="technicalResponsible"
              value={formData.technicalResponsible}
              onChange={handleChange}
              className={errors.technicalResponsible ? 'error' : ''}
            />
          </div>
          <div className="form-group form-group-small">
            <label htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>        
        <div className="form-group">
          <label htmlFor="ph">pH</label>
          <div className="input-with-helper">
            <input
              type="number"
              id="ph"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              step="0.1"
              className={errors.ph ? 'error' : ''}
            />
            <div className="helper-text-inline">
              <span className="good">Bom: 6.5-8.5</span>
              <span className="regular">Regular: 6.0-6.4 ou 8.6-9.0</span>
              <span className="critical">Crítico: &lt;6.0 ou &gt;9.0</span>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="turbidity">Turbidez</label>
          <div className="input-with-helper">
            <input
              type="number"
              id="turbidity"
              name="turbidity"
              value={formData.turbidity}
              onChange={handleChange}
              step="0.1"
              className={errors.turbidity ? 'error' : ''}
            />
            <div className="helper-text-inline">
              <span className="good">Bom: &lt;1</span>
              <span className="regular">Regular: 1-5</span>
              <span className="critical">Crítico: &gt;5</span>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="dissolvedOxygen">Oxigênio Dissolvido</label>
          <div className="input-with-helper">
            <input
              type="number"
              id="dissolvedOxygen"
              name="dissolvedOxygen"
              value={formData.dissolvedOxygen}
              onChange={handleChange}
              step="0.1"
              className={errors.dissolvedOxygen ? 'error' : ''}
            />
            <div className="helper-text-inline">
              <span className="good">Bom: &gt;5</span>
              <span className="regular">Regular: 3-5</span>
              <span className="critical">Crítico: &lt;3</span>
            </div>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="heavyMetalsPresent"
              checked={formData.heavyMetalsPresent}
              onChange={handleChange}
            />
            Metais Pesados Presentes
          </label>
        </div>
        
        {formData.heavyMetalsPresent && (
          <div className="form-group">
            <label htmlFor="heavyMetalsLevel">Nível de Metais Pesados <span className="required-asterisk">*</span></label>
            <div className="input-with-helper">
              <input
                type="number"
                id="heavyMetalsLevel"
                name="heavyMetalsLevel"
                value={formData.heavyMetalsLevel || ''}
                onChange={handleChange}
                step="0.0001"
                className={errors.heavyMetalsLevel ? 'error' : ''}
              />
              <div className="helper-text-inline">
                <span className="good">Bom: &lt;0.01</span>
                <span className="regular">Regular: 0.01-0.05</span>
                <span className="critical">Crítico: &gt;0.05</span>
              </div>
            </div>
          </div>
        )}        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="residuesDetected"
              checked={formData.residuesDetected}
              onChange={handleChange}
            />
            Resíduos Detectados
          </label>
          <div className="helper-text-inline">
            <span className="good">Bom: Não</span>
            <span className="critical">Crítico: Sim</span>
          </div>
        </div>
        
        {formData.residuesDetected && (
          <div className="form-group">
            <label htmlFor="residuesDescription">Descrição dos Resíduos <span className="required-asterisk">*</span></label>
            <textarea
              id="residuesDescription"
              name="residuesDescription"
              value={formData.residuesDescription || ''}
              onChange={handleChange}
              placeholder="Descreva os resíduos detectados..."
              maxLength={250}
              rows={3}
              className={errors.residuesDescription ? 'error' : ''}
            />
            <small className="char-count">
              {(formData.residuesDescription || '').length}/250 caracteres
            </small>
          </div>
        )}
          <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </div>
      </form>
      <Toast 
        message="Campos não preenchidos ou inválidos" 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default CardForm;
