// Re-export from the unified iframeBridge utility. The bridge owns the
// canonical embed/iframe detection across every SmoothieKing Learnings
// project. Keep this thin alias so existing imports compile unchanged.
export { isEmbedded } from '../utils/iframeBridge'
