
import React from 'react'
import Layout from '../components/layout'

const Character = props => {
  console.log(props)
  return (
    <Layout>
      <div class="rounded overflow-hidden shadow-2xl my-2">
        <img
          class="w-full"
          src={props.pageContext.avatar}
        />
        <div class="px-6 py-4">
          <div class="font-bold font-mono text-xl mb-2">
            {props.pageContext.name}
          </div>
          <p class="text-grey-darker text-base">{props.pageContext.description}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Character