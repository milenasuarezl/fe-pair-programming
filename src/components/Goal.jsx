const Goal = (props) => {
    const { name, goalTarget, goalProgress, bankName } = props.goal;

    return(
      <div className='wrapper'>
        <div>
        <h5>{name}</h5>
        <div className='wrapper__target'>
            <p>Target: {goalTarget}</p>
            <p>Goal: {goalProgress}</p>
        </div>
        <div className='wrapper_bank'>
            <p>Receiving Account:</p>
            <p>{bankName}</p>
        </div>
        progress { (goalProgress / goalTarget) * 100}
        <progress value={goalProgress} max={goalProgress}> { (goalProgress / goalTarget) * 100} </progress> 
    
        </div>
    </div>
    );
}

export default Goal;
