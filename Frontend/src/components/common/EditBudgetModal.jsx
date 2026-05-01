import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { DollarSign } from 'lucide-react';

const EditBudgetModal = ({ isOpen, onClose, budget, onUpdate }) => {
  const [totalAmount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (budget) {
      setTotalAmount(budget.totalAmount.toString());
      setError('');
    }
  }, [budget, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!totalAmount || isNaN(totalAmount) || Number(totalAmount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/budgets/${budget.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount: Number(totalAmount) }),
      });

      if (!res.ok) {
        throw new Error('Failed to update budget');
      }

      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Budget">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-sm text-slate-500 mb-4">
            Update your monthly budget for <span className="font-bold text-slate-800">{budget?.category}</span>.
          </p>
        </div>

        <Input
          label="Total Budget Amount"
          id="totalAmount"
          type="number"
          step="0.01"
          placeholder="e.g. 500"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          icon={<DollarSign size={18} className="text-slate-400" />}
          error={error}
        />

        <div className="pt-4 flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="flex-1"
            isLoading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBudgetModal;
