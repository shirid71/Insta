
export function FollowModal({ followsIsOpen, onClose, follows }) {
    console.log("@@@ follows " , follows)

    const modalClass = followsIsOpen ? 'follow-modal follow-modal-wrappe' : 'follow-modal';

    if(follows?.length < 0 ) 
    return (
        <div className={modalClass}>
          <div className="follow-container">
            <span className="close" onClick={onClose}>&times;</span>
            <p>This is a modal!</p>
          </div>
        </div>
      );
    };
    
    // return <div className="follow-modal">
    //     <div className="follow-container">
    //         <header>
    //             <span>follows</span>
    //             <a onClick={() => followsIsOpen([])}><i className="fa-solid fa-x"></i></a>
    //         </header>
    //         <div className="followslist">
    //             {follows.map(follow => <div key={follow._id} className="follow-info">
    //                 <div>
    //                     <img src={follow.imgUrl} />
    //                     <section className="user-info">
    //                         <a>{follow.username}</a>
    //                         <span>{follow.fullname}</span>
    //                     </section>
    //                 </div>
    //                 <button>Follow</button>
    //             </div>)}
    //         </div>
    //     </div>
    // </div>
// }