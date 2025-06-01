
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, CircleMinus, CirclePlus, TrendingUp, TrendingDown } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface DashboardProps {
  transactions: Transaction[];
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, userName }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Greeting */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-3">Good {getTimeOfDay()}, {userName}! 👋</h2>
        <p className="text-indigo-100 text-lg">Here's your financial overview for today</p>
        <div className="mt-6 text-right">
          <p className="text-indigo-200 text-sm">Total Balance</p>
          <p className={`text-4xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-300'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Enhanced Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Total Income</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <CirclePlus className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 mb-2">{formatCurrency(totalIncome)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-red-700">Total Expenses</CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <CircleMinus className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700 mb-2">{formatCurrency(totalExpenses)}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Net Balance</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold mb-2 ${balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
              {formatCurrency(balance)}
            </div>
            <div className={`flex items-center text-xs ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {balance >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {balance >= 0 ? 'Positive balance' : 'Negative balance'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Transactions */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-600">Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleDollarSign className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No transactions yet</p>
                <p className="text-gray-400 text-sm">Add your first transaction to get started!</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-br from-green-400 to-green-500' 
                        : 'bg-gradient-to-br from-red-400 to-red-500'
                    }`}>
                      {transaction.type === 'income' ? 
                        <CirclePlus className="h-6 w-6 text-white" /> : 
                        <CircleMinus className="h-6 w-6 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-medium">
                          {transaction.category}
                        </span>
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
