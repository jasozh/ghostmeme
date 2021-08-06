import { useState, useEffect } from 'react'
import { Button, Table, TableCell, TableRow, Paper, Typography } from '@material-ui/core'

import Story from '../components/Story'
import Comment from '../components/Comment'
import Form from '../components/Form'

import { redirect } from '../services/userService'
import { getCommentMemes, getStoryMemes, createMeme } from '../services/memeService'
import { commentSchema, storySchema } from '../services/schemas'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])
  
  var memeID = '610443ccfe98ab104293a280'

  const [memes, setMemes] = useState([])
  const [comments, setComments] = useState([])

  const updateMemes = async () => {
    setMemes(await getStoryMemes(user) || memes)
  }

  const updateCommentMemes = async () => {
    setComments(await getCommentMemes(memeID) || comments)
  }

  const handleCreateMeme = async values => {
    if (await createMeme(user, null, values)) await updateMemes()
  }

  useEffect(() => updateMemes(), [user])
  useEffect(() => updateCommentMemes())

  return user.loading === undefined && <Paper className='paper' elevation={3}>
    <Typography className='chat-header' variant='h4'>{user.username}'s Story!</Typography>
    <Table>
      {memes.map(meme =>
        <TableRow>
          <TableCell width='30%' />
          <TableCell width='40%'>
            <Story meme={meme} username={user.username} update={updateMemes} />
          </TableCell>
          <TableCell width='30%'>
          </TableCell>
        </TableRow>
      )}
    </Table>
    <Typography className='chat-header' variant='h6'>Comments</Typography>
    {/* <Button onClick={updateCommentMemes}>Comments</Button> */}
    <Table>
      {comments.map(comment =>
        <TableRow>
          <TableCell width='30%' />
          <TableCell width='40%'>
            <Comment meme={comment} username={user.username} update={updateCommentMemes} />
          </TableCell>
          <TableCell width='30%'>
          </TableCell>
        </TableRow>
      )}
    </Table>
    <hr />
    <div className='chat-footer'>
      <Form
        name='Post Story'
        action={handleCreateMeme}
        schema={storySchema}
        inline={2}
      />
    </div>
    <div className='chat-footer'>
      <Form
        name='Post Comment'
        action={handleCreateMeme}
        schema={commentSchema}
        inline={2}
      />
    </div>
  </Paper>
}