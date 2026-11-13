const test = require("node:test")
const assert = require("node:assert/strict")
const { createPostPayload } = require("../lib/admin-post-payload.cjs")

const post = {
  title: "테스트 게시글",
  content: "본문",
  category_id: "7",
  is_public: true,
  slug: "test-post",
  thumbnail_url: "",
}

test("공개 설정으로 발행하면 공개 payload를 만든다", () => {
  assert.equal(createPostPayload(post).is_public, true)
})

test("비공개 설정으로 발행하면 비공개 payload를 만든다", () => {
  assert.equal(createPostPayload({ ...post, is_public: false }).is_public, false)
})

test("임시저장은 공개 토글과 관계없이 비공개 payload를 만든다", () => {
  assert.equal(createPostPayload(post, { draft: true }).is_public, false)
})

test("카테고리 ID를 API의 숫자 형식으로 변환한다", () => {
  assert.equal(createPostPayload(post).category_id, 7)
})
