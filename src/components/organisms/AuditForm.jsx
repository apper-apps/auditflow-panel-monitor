import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import Select from "@/components/atoms/Select"
import FormField from "@/components/molecules/FormField"
import RagIndicator from "@/components/molecules/RagIndicator"

export default function AuditForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    storeId: "",
    auditorId: "AUD001",
    scheduledDate: new Date().toISOString().split('T')[0],
    responses: [
      { question: "Store cleanliness and organization", rating: "green", comments: "" },
      { question: "Staff appearance and behavior", rating: "green", comments: "" },
      { question: "Product display and pricing", rating: "green", comments: "" },
      { question: "Customer service quality", rating: "green", comments: "" },
      { question: "Safety and security measures", rating: "green", comments: "" },
      { question: "Inventory management", rating: "green", comments: "" },
      { question: "POS system functionality", rating: "green", comments: "" },
      { question: "Promotional materials accuracy", rating: "green", comments: "" }
    ]
  })
  const [attachments, setAttachments] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (index, rating) => {
    setFormData(prev => ({
      ...prev,
      responses: prev.responses.map((response, i) => 
        i === index ? { ...response, rating } : response
      )
    }))
  }

  const handleCommentsChange = (index, comments) => {
    setFormData(prev => ({
      ...prev,
      responses: prev.responses.map((response, i) => 
        i === index ? { ...response, comments } : response
      )
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setAttachments(prev => [...prev, ...files])
    toast.info(`${files.length} file(s) uploaded successfully`)
  }

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.storeId) {
      toast.error("Please select a store")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onSubmit?.(formData)
      toast.success("Audit submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit audit")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getOverallRating = () => {
    const ratings = formData.responses.map(r => r.rating)
    const redCount = ratings.filter(r => r === "red").length
    const amberCount = ratings.filter(r => r === "amber").length
    
    if (redCount > 0) return "red"
    if (amberCount > 0) return "amber"
    return "green"
  }

  return (
    <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="ClipboardList" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Retail Audit Form</h3>
              <p className="text-sm text-gray-600">Complete the audit questionnaire</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Overall Rating:</span>
            <RagIndicator value={getOverallRating()} size="lg" showLabel />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Store ID" required>
            <Select
              name="storeId"
              value={formData.storeId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Store</option>
              <option value="STR001">Store 001 - Downtown</option>
              <option value="STR002">Store 002 - Mall Location</option>
              <option value="STR003">Store 003 - Suburban</option>
              <option value="STR004">Store 004 - Airport</option>
            </Select>
          </FormField>

          <FormField label="Scheduled Date" required>
            <Input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleInputChange}
              required
            />
          </FormField>
        </div>

        {/* Audit Questions */}
        <div className="space-y-6">
          <h4 className="text-lg font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Audit Questionnaire
          </h4>
          
          {formData.responses.map((response, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900">{response.question}</h5>
                  <RagIndicator
                    value={response.rating}
                    interactive
                    onValueChange={(rating) => handleRatingChange(index, rating)}
                    size="lg"
                  />
                </div>
                
                <FormField label="Comments (Optional)">
                  <textarea
                    rows={3}
                    placeholder="Add any additional comments or observations..."
                    value={response.comments}
                    onChange={(e) => handleCommentsChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </FormField>
              </div>
            </motion.div>
          ))}
        </div>

        {/* File Attachments */}
        <div className="space-y-4">
          <h4 className="text-lg font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Attachments
          </h4>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-2">
                <ApperIcon name="Upload" className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-gray-600">Click to upload files or drag and drop</p>
                <p className="text-xs text-gray-500">Images, PDF, DOC (max 10MB each)</p>
              </div>
            </label>
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="File" className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-error hover:text-red-700 transition-colors"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => toast.info("Audit saved as draft")}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="min-w-32"
            >
              Submit Audit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}