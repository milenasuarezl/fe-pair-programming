import { useState, useEffect } from "react";
import useFetchApi from "../hooks/fetchApi";
import Goal from "./Goal";

const Home = () => {
    const { response: financialGoals } = useFetchApi('financialGoals');
    const { response: bankAccounts } = useFetchApi('bankAccounts');
    const [ netWorth, setNetWorth ] = useState(0);
    const [ goals, setFinancialGoals ] = useState();

    const calculaNetworth = (bankAccounts) => {
        const number = bankAccounts.reduce((acc, { balance }) => acc+=balance, 0);
        return new Intl.NumberFormat().format(number)
    }

    const linkedBankGoals = (bankAccounts, financialGoals) => {
         const goals = [];
         financialGoals.forEach(goal => {
            let bank = bankAccounts.find(({id}) => id === goal.accountId);
            if (bank) goals.push({... goal, bankName: bank.name })
        })
        return goals;
    }

    useEffect(() => {
        const netWorth = bankAccounts ? calculaNetworth(bankAccounts) : 0;
        const goals = bankAccounts && financialGoals ? linkedBankGoals(bankAccounts, financialGoals) : [];
        setNetWorth(netWorth);
        setFinancialGoals(goals);
    }, [bankAccounts, financialGoals]);

    return(
        <div className="home">
            <section className='home__header'>
                <h3>Your net worth</h3>
                <p>${netWorth}</p>
            </section>
            { goals ? 
                <section className="home__goals">
                    <h5>Your Goals</h5>
                    {
                        goals.map(goal => <Goal key={goal.id} goal={goal}/>)
                    }
                </section>
            : ''
            }
        </div>
    )
}

export default Home;