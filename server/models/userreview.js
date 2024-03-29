const mongoose = require('mongoose')

const { Schema } = mongoose

const UserReviewSchema = new Schema(
  {
    usersAvatar: { type: String, default: '' },
    expertEmail: { type: String, default: '' },
    expertFullName: { type: String, default: '' },
    expertSlug: { type: String, default: '' },
    userEmail: { type: String, default: '' },
    userFullName: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    review: { type: String, default: '' },
    title: { type: String, default: 'user rating' },
    reviewBy: { type: String, default: '' },
  },
  {
    timestamps: true, // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
)

module.exports = mongoose.model('UserReview', UserReviewSchema)
