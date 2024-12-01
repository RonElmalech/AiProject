import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, Loader } from '../components'
import preview from '../assets/preview.png'
import getRandomPrompt from '../utils/index.js'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', 
    prompt: '', 
    photo: '',  // Keep photo as a base64 or URL string for now
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch('https://aiproject-server.onrender.com/api/v1/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (response.ok) {
          await response.json()
          navigate('/')
        } else {
          throw new Error('Failed to create post')
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  }

  // Handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle surprise me (random prompt)
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  // Generate image with the DALL-E API
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('https://aiproject-server.onrender.com/api/v1/dalle/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        if (!response.ok) throw new Error('Error generating image')

        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.startsWith('image/')) {
          const blob = await response.blob()
          const base64Image = await convertBlobToBase64(blob)
          setForm({ ...form, photo: base64Image })  // Set base64 string to form
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Unexpected response format')
        }
      } catch (error) {
        alert(`Error: ${error.message}`)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  // Convert image blob to base64 string
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
            autocomplete="given-name" 
          />
          <FormField
            labelName='Prompt'
            type='text'
            name="prompt"
            placeholder="A photo of a Samoyed dog with its tongue out hugging a white Siamese cat"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]' >
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
