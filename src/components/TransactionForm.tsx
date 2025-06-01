
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Transaction>({
    type: 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'];
  const expenseCategories = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other Expense'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount > 0 && formData.category && formData.description) {
      onSubmit(formData);
      setFormData({
        type: 'expense',
        amount: 0,
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '' // Reset category when type changes
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transaction Type */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={formData.type === 'income' ? 'default' : 'outline'}
          onClick={() => handleTypeChange('income')}
          className={formData.type === 'income' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          Income
        </Button>
        <Button
          type="button"
          variant={formData.type === 'expense' ? 'default' : 'outline'}
          onClick={() => handleTypeChange('expense')}
          className={formData.type === 'expense' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          Expense
        </Button>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.amount || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {(formData.type === 'income' ? incomeCategories : expenseCategories).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for this transaction"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700"
        disabled={!formData.amount || !formData.category || !formData.description}
      >
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
