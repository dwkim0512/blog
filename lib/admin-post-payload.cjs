/**
 * @typedef {Object} AdminPostDraft
 * @property {string} title
 * @property {string} content
 * @property {string} category_id
 * @property {boolean} is_public
 * @property {string} slug
 * @property {string} thumbnail_url
 */

/**
 * Builds the create-post request body while keeping draft saves private.
 *
 * @param {AdminPostDraft} post
 * @param {{ draft?: boolean }} [options]
 */
function createPostPayload(post, { draft = false } = {}) {
  return {
    ...post,
    category_id: Number.parseInt(post.category_id) || 0,
    is_public: draft ? false : post.is_public,
  }
}

module.exports = { createPostPayload }
