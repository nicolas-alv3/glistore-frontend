import type {NextPage} from 'next';
import React from "react";
import GTitle, {GTitleSize} from "../src/components/Utils/GTitle";

const Home: NextPage = () => {
    return (
    <div>
      <main >
          <GTitle size={GTitleSize.LARGE} title={"Bienvenid@ a Glistore!"}/>
      </main>
    </div>
  )
}

export default Home
