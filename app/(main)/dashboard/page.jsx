import React, { Suspense } from 'react'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import AccountCard from './_components/account-card'
import { getCurrentBudget } from '@/actions/budget'
import {BudgetProgress} from './_components/budget-progress'
import { DashboardOverview } from './_components/dashboard-overview'
async function  DashboardPage(){
    const accounts=await getUserAccounts();
    // console.log(accounts);
    const defaultAccount=accounts?.find((account)=>account.isDefault);
    let budgetData=null;
    if(defaultAccount){
      // console.log("safari bag");
      // console.log(defaultAccount.name);
      
      budgetData=await getCurrentBudget(defaultAccount.id)
    }
    // console.log(budgetData);
      const transactions=await getDashboardData()
    return (
      <div className='space-y-8'>
        {/* Budget Progress */}
        {
          defaultAccount && <BudgetProgress 
           initialBudget={budgetData?.budget}
           currentExpenses={budgetData?.currentExpenses || 0}
          />
        }
        {/* Dashboard overview */}

            <Suspense fallback={"Loading Overview..."}>
              <DashboardOverview
              accounts={accounts}
              transactions={transactions || []}
              />
              
            </Suspense>

        {/* Accounts grid */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className='h-10 w-10 mb-2' />
                  <p className='text-sm font-medium'>Add new Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {
            accounts.length>0 && accounts?.map((account)=>{
              return <AccountCard key={account.id} account={account} />
            })
          }
        </div>
      </div>
    )
}
export default DashboardPage
