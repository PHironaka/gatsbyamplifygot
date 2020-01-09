import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Characters = () => {
  const data = useStaticQuery(graphql`
    {
        got {
            listCharacters {
              items {
                name
                avatar
                description
              }
            }
          }
    }
  `)

  return (
    <div className="container mt-6 font-mono">
      <h1 className="font-mono">Reviews</h1>
      <div className="container">
        {data.got.listCharacters.items.map(review => (
          <>
            <div key={review.id} className="py-8">
                  <img
                    class="rounded-lg md:w-56"
                    src={review.avatar}
                    alt={review.name}
                  />
                  <div class="uppercase tracking-wide text-sm text-teal-200 font-bold">
                    {review.name}
                  </div>
                  <p>
                      {review.description}
                  </p>
                  </div>
                  
          </>
        ))}
      </div>
    </div>
  )
}
export default Characters