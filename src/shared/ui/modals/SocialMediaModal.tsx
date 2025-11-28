/**
 * Social Media Modal Component
 * @module shared/ui/modals/SocialMediaModal
 * 
 * Modal dialog for adding social media links.
 * Supports adding profile links for various platforms (Facebook, Twitter, LinkedIn, etc.).
 * 
 * ✅ DIAMOND STANDARD: Shared UI modal component
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#shared-layer}
 */

"use client";

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface SocialMediaModalProps {
  show: boolean;
  onClose: () => void;
  socialMedia: SocialMedia[];
  setSocialMedia: (media: SocialMedia[]) => void;
  newSocialMedia?: { platform: string; url: string; icon: string };
  setNewSocialMedia?: (media: { platform: string; url: string; icon: string }) => void;
}

export default function SocialMediaModal({
  show,
  onClose,
  socialMedia,
  setSocialMedia,
  newSocialMedia = { platform: 'Facebook', url: '', icon: '📘' },
  setNewSocialMedia = () => {},
}: SocialMediaModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const social = {
      id: Date.now().toString(),
      platform: newSocialMedia.platform,
      url: newSocialMedia.url,
      icon: newSocialMedia.icon
    };
    setSocialMedia([...socialMedia, social]);
    onClose();
    setNewSocialMedia({ platform: 'Facebook', url: '', icon: '📘' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Social Media</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
            <select
              value={newSocialMedia.platform}
              onChange={(e) => {
                const platform = e.target.value;
                let icon = '🌐';
                if (platform === 'Facebook') icon = '📘';
                else if (platform === 'Instagram') icon = '📷';
                else if (platform === 'Twitter') icon = '🐦';
                else if (platform === 'LinkedIn') icon = '💼';
                else if (platform === 'YouTube') icon = '📹';
                else if (platform === 'TikTok') icon = '🎵';
                else if (platform === 'Pinterest') icon = '📌';
                setNewSocialMedia({...newSocialMedia, platform, icon});
              }}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              aria-label="Social Media Platform"
            >
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Pinterest">Pinterest</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Profile URL</label>
            <input
              type="url"
              value={newSocialMedia.url}
              onChange={(e) => setNewSocialMedia({...newSocialMedia, url: e.target.value})}
              required
              placeholder="https://facebook.com/yourprofile"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Add Social Media
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
