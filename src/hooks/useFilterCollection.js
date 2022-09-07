import { useAuthContext } from './useAuthContext';

const useFilterCollection = (documents) => {
    const { authIsReady,  user } = useAuthContext();

    function filteringIt(documents){

        let finalarray = []
        if(documents && user){
            console.log('filtering the docs')
            let projectss = documents.filter((doc) => doc.owner == user.uid);
    
            let teamMember = []
    
            const projectsTwo = documents.forEach(pro => {
                let membersarr = pro.members
                // console.log(membersarr)
                membersarr.forEach(member => {
                    if(member.id === user.uid) teamMember.push(pro)
                })
            })
    
            let semifinalProjects = [...projectss, ...teamMember]
            const uniqueIds = []
            const finalProjects = semifinalProjects.filter(pro =>{
                const isDuplicate = uniqueIds.includes(pro.id)
    
                if(!isDuplicate){
    
                    uniqueIds.push(pro.id);
                    return true
                } 
                return false
            })
            
    
             
             finalarray = finalProjects
             
         }
         return finalarray
    }

     return filteringIt
}

export default useFilterCollection