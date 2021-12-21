// We do not write React components in any file within api folder
// we can execute any server side code of our choice
// none of the code in api files will be exposed to the client
// just as the code executed in getStaticProps and getServerSideProps was
// not exposed to the client

function handler(req, res) {
    res.status(200).json({message: 'This works!'})
}

export default handler