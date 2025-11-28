/**
 * TestimonialModal Component
 * @module shared/ui/modals/TestimonialModal
 * 
 * ✅ DIAMOND STANDARD: Modal for adding testimonials (GetWork-alpha exact match)
 */

"use client";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface TestimonialModalProps {
  show: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  newTestimonial: { name: string; text: string; rating: number };
  setNewTestimonial: (testimonial: { name: string; text: string; rating: number }) => void;
}

export function TestimonialModal({
  show,
  onClose,
  testimonials,
  setTestimonials,
  newTestimonial,
  setNewTestimonial,
}: TestimonialModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const testimonial = {
      id: Date.now().toString(),
      name: newTestimonial.name,
      text: newTestimonial.text,
      rating: newTestimonial.rating
    };
    setTestimonials([...testimonials, testimonial]);
    onClose();
    setNewTestimonial({ name: '', text: '', rating: 5 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add Customer Testimonial</h3>
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Customer Name</label>
            <input
              type="text"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
              required
              placeholder="e.g. Jennifer Martinez"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial</label>
            <textarea
              value={newTestimonial.text}
              onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
              required
              rows={4}
              placeholder="What did the customer say about your service?"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
            <select
              value={newTestimonial.rating}
              onChange={(e) => setNewTestimonial({...newTestimonial, rating: Number(e.target.value)})}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              aria-label="Rating"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
              <option value={3}>⭐⭐⭐ (3 stars)</option>
              <option value={2}>⭐⭐ (2 stars)</option>
              <option value={1}>⭐ (1 star)</option>
            </select>
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
              Add Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestimonialModal;
