// We do not write React components in any file within api folder
// we can execute any server side code of our choice
// none of the code in api files will be exposed to the client
// just as the code executed in getStaticProps and getServerSideProps was
// not exposed to the client

import fs from 'fs'
import path from 'path'

function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')
    
}

function extractFeedback(filePath) {
    // this reads and gives us the current data in the file
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

function handler(req, res) {
    if (req.method === 'POST') {
        // Next automatically parses body data
        const email = req.body.email
        const feedbackText = req.body.text
        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }
        // we will store data in a file but could store in a database
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({message: 'Successfully sent feedback!', feedback: newFeedback})

    } else {
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({ feedback: data})
    }
    
}

export default handler