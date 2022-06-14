import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ // 設定情報のインスタンス化
  accept:'application/vnd.github.v3+json',
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'ooitanojohn-blog',
  timeZone: 'Asia/Tokyo',
  baseUrl: 'https://api.github.com'
});

export async function getGitProfileData() { // プロフィールを取ってくる
  // octokit/restライブラリ
  const profile = await octokit.request('/users/ooitanojohn')// クエリをここで書く
  interface profile{ // 型定義
    data: {
      login: string
      bio: string
      avatar_url: string
      created_at: string
      updated_at: string
    }
  }
  return profile
}

export async function getAllGitRepoData() { // 公開リポジトリ一覧取得
  const repositories = await octokit.request('GET /user/repos', {
    visibility: 'public',
    affiliation: 'owner',
    per_page: 100,
    sort:'created'
  })
  // console.log(typeof repositories)
  interface repositories{
    data: {
      name: string
      description:string
      html_url:string
      created_at: string
      updated_at: string
      pushed_at: string
    }
  }
  return repositories
}

export async function getPageGitRepoData(page) { // 公開リポジトリpage取得
  const repositories = await octokit.request('GET /user/repos', {
    visibility: 'public',
    affiliation: 'owner',
    per_page: 5,
    page:page,
    sort:'created'
  })
  // console.log(typeof repositories)
  interface repositories{
    data: {
      name: string
      description:string
      html_url:string
      created_at: string
      updated_at: string
      pushed_at: string
    }
  }
  return repositories
}