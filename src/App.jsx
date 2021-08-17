import { useEffect, useState } from "react";
import "./App.css";

const URI = 'http://localhost:8080/';

const Card = ({goal}) => {
  console.log('finanGoals', goal)
  const { name, goalTarget, goalProgress, bankname, progress} = goal;
  return(
    <div>
      <div>{name}</div>
      <section>
        <div>
          <label htmlFor="">
              Target
          </label>
          <span>${goalTarget}</span>
        </div>
        <div>
          <label htmlFor="">
              Goal
          </label>
          <span>${goalProgress}</span>
        </div>
        <div>
          <label htmlFor="">Receiving account</label>
          <p>{bankname}</p>
        </div>
        <div>
          Progress {progress}
        </div>
        <progress value={goalProgress} max={goalTarget}> {progress} </progress>
      </section>
    </div>
  )
}


function App() {
  const [ accounts, setAccounts] = useState();
  const [ goals, setGoals] = useState();
  const [ financialGoals, setfinancialGoals] = useState();
  const [ netWorth, setNet] = useState();

  const getBankAccount = async () => {
    const banckAccounts = await fetch(`${URI}bankAccounts`).then((response) => response.json()).then(account => account);
    setAccounts(banckAccounts)
  }

  const getFinancialGoals= async () => {
    const goals = await fetch(`${URI}financialGoals`).then((response) => response.json()).then(goals => goals);
    setGoals(goals)
  }

  const calculatedGoal = () => {
    return goals.map((goal) => {
      const bankAccount = accounts.find(account => account.id === goal.accountId);
      const bankName = bankAccount?.name ?? '';
      const progress = (goal.goalProgress / goal.goalTarget) * 100;
      return { ...goal, bankName, progress};
    });
  }

  const sumBalanceAccounts = () => {
     const sum = accounts.reduce((acc, account) => acc + account.balance, 0);
     setNet(sum);
  }

  useEffect(() => {
    const finanGoals = accounts && goals ? calculatedGoal() : undefined;
    setfinancialGoals(finanGoals)

    if (accounts) {
      sumBalanceAccounts();
    }
  }, [accounts, goals])
      

  useEffect(() => {
    getBankAccount();
    getFinancialGoals();
  }, [])

  return (
    <div>
      <header>Your net worth</header>
      {
        netWorth ? netWorth : 'Accounts does not exis'
      }
      <div>

      </div>
      { financialGoals ? 
        financialGoals.map(goal => {
          return <Card goal={goal}/>
        })
        : 'No data'
      }
      <section>

      </section>
    </div>
  );
}

export default App;
