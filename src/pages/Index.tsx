
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseChart from '@/components/ExpenseChart';
import { toast } from 'sonner';
import { LogOut, Plus, List, BarChart3, Home } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data for demonstration
  useEffect(() => {
    // Simulate some initial transactions
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'income',
        amount: 3000,
        category: 'Salary',
        description: 'Monthly salary',
        date: '2025-01-01'
      },
      {
        id: '2',
        type: 'expense',
        amount: 800,
        category: 'Rent',
        description: 'Monthly rent payment',
        date: '2025-01-02'
      },
      {
        id: '3',
        type: 'expense',
        amount: 150,
        category: 'Groceries',
        description: 'Weekly grocery shopping',
        date: '2025-01-03'
      },
      {
        id: '4',
        type: 'expense',
        amount: 60,
        category: 'Transportation',
        description: 'Gas for car',
        date: '2025-01-04'
      }
    ];
    setTransactions(sampleTransactions);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    toast.success('Logged out successfully');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast.success(`${transaction.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success('Transaction deleted successfully');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FinanceTracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} className="bg-white border-gray-300 hover:bg-gray-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border border-gray-200 p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="add-transaction"
              className="flex items-center space-x-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Transaction</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions"
              className="flex items-center space-x-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="flex items-center space-x-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard transactions={transactions} userName={user.name} />
          </TabsContent>

          <TabsContent value="add-transaction">
            <Card className="shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800">Add New Transaction</CardTitle>
                <CardDescription className="text-gray-600">
                  Record your income or expenses to keep track of your finances
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TransactionForm onSubmit={addTransaction} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart transactions={transactions} />
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Monthly Trends</CardTitle>
                  <CardDescription className="text-gray-600">Track your spending patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">Monthly trend chart coming soon...</p>
                      <p className="text-sm text-gray-400">Advanced analytics in development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
