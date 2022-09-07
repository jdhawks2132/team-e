import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"
import useFilterCollection from './useFilterCollection'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const filterTheCollection = useFilterCollection()

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    console.log('mounting')
    let ref = projectFirestore.collection(collection)
    
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      console.log('running the onsnapshot')
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      if(collection === 'test-projects'){
        let filteredCollection = filterTheCollection(results);
        setDocuments(filteredCollection)
      }
      else setDocuments(results);

      setError(null)
    }, error => {
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => {
      console.log('unmounting')
      unsubscribe()
    }

  }, [collection, query, orderBy])

  return { documents, error }
}