/**
 * Event API Integration
 * Handles fetching event data from the backend
 */

export interface Event {
  _id: {
    $oid: string;
  };
  name: string;
  slug: string;
  type: string;
  eventPhoto: string;
  isTeamEvent: boolean;
  prizeMoney: number;
  entryFee: number;
  psLink: string;
  unstopLink: string;
  whatsappNo: string;
  whatsappGrpLink: string;
  aboutEvent: string;
  prizeDistribution: {
    first: number;
    second: number;
    third: number;
  };
  hideEvent: boolean;
  stopRegistration: boolean;
  maxTeamSize: number;
  minTeamSize: number;
  registrationDeadline: {
    $date: string;
  };
  venue: string;
  rules: string[];
  __v: number;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
}

/**
 * Fetch event by slug from the backend API
 * @param slug - The event slug identifier
 * @returns Event data
 */
// Mock data for development/fallback
const MOCK_EVENTS: Record<string, Event> = {
  'technical-quiz': {
    "_id": {
      "$oid": "6944081657bfcf8bcb4ea660"
    },
    "name": "Technical Quiz",
    "slug": "technical-quiz",
    "type": "technical",
    "eventPhoto": "", // Placeholder for testing
    "isTeamEvent": false,
    "prizeMoney": 0,
    "entryFee": 0,
    "psLink": "",
    "unstopLink": "",
    "whatsappNo": "",
    "whatsappGrpLink": "",
    "aboutEvent": "Test your technical knowledge in this challenging quiz competition. Participants will face a series of questions covering various engineering domains, current technological trends, and problem-solving scenarios.",
    "prizeDistribution": {
      "first": 0,
      "second": 0,
      "third": 0
    },
    "hideEvent": false,
    "stopRegistration": false,
    "maxTeamSize": 3,
    "minTeamSize": 1,
    "registrationDeadline": {
      "$date": "2025-12-25T13:56:36.665Z"
    },
    "venue": "Lecture Hall Complex",
    "rules": [
      "Participants must carry a valid ID card.",
      "Use of mobile phones is strictly prohibited during the quiz.",
      "The quiz master's decision is final and binding.",
      "Teams found cheating will be immediately disqualified."
    ],
    "__v": 0,
    "createdAt": {
      "$date": "2025-12-18T13:56:38.542Z"
    },
    "updatedAt": {
      "$date": "2025-12-18T13:56:38.542Z"
    }
  },
  // Add a generic fallback for farm-track or other slugs to help with testing
  'farm-track': {
    "_id": {
      "$oid": "mock_id_farm_track"
    },
    "name": "Farm Track",
    "slug": "farm-track",
    "type": "technical",
    "eventPhoto": "",
    "isTeamEvent": true,
    "prizeMoney": 15000,
    "entryFee": 500,
    "psLink": "https://example.com/ps",
    "unstopLink": "https://unstop.com/event",
    "whatsappNo": "919876543210",
    "whatsappGrpLink": "https://chat.whatsapp.com/invite",
    "aboutEvent": "Build a robot with a gripper that can traverse through uneven terrain full of obstacles, perform the task of gripping objects and placing them at specified locations in the arena.",
    "prizeDistribution": {
      "first": 8000,
      "second": 5000,
      "third": 2000
    },
    "hideEvent": false,
    "stopRegistration": false,
    "maxTeamSize": 4,
    "minTeamSize": 2,
    "registrationDeadline": {
      "$date": "2025-01-15T23:59:59.000Z"
    },
    "venue": "Block A, Ground Floor",
    "rules": [
      "Robot dimensions must fit within 30x30x30 cm.",
      "maximum weight of the bot should not exceed 5kg.",
      "The bots should be wireless.",
      "Use of Lego kits is not allowed."
    ],
    "__v": 0,
    "createdAt": {
      "$date": "2025-10-01T10:00:00.000Z"
    },
    "updatedAt": {
      "$date": "2025-10-01T10:00:00.000Z"
    }
  }
};

/**
 * Fetch event by slug from the backend API
 * @param slug - The event slug identifier
 * @returns Event data
 */
export async function getEventBySlug(slug: string): Promise<Event> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is configured, use mock data immediately
    if (!API_BASE_URL) {
      console.warn('No API URL configured, using mock data for:', slug);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      const mockEvent = MOCK_EVENTS[slug] || MOCK_EVENTS['technical-quiz'];
      // Ensure the returned mock has the correct slug if falling back
      return { ...mockEvent, slug: slug === 'technical-quiz' || slug === 'farm-track' ? mockEvent.slug : slug, name: slug === 'technical-quiz' || slug === 'farm-track' ? mockEvent.name : slug.replace(/-/g, ' ').toUpperCase() };
    }

    const response = await fetch(`${API_BASE_URL}/api/events/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Error fetching event '${slug}' from API, falling back to mock data:`, error);
    
    // Fallback to mock data on error
    const mockEvent = MOCK_EVENTS[slug] || MOCK_EVENTS['technical-quiz'];
    // Return mock data with requested slug/name if specific mock doesn't exist
    return { 
      ...mockEvent, 
      slug: slug,
      name: MOCK_EVENTS[slug] ? mockEvent.name : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    };
  }
}

/**
 * Format date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Calculate days remaining until deadline
 */
export function getDaysRemaining(deadlineString: string): number {
  const deadline = new Date(deadlineString);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get event status based on flags and deadline
 */
export function getEventStatus(event: Event): 'OPEN' | 'CLOSED' | 'HIDDEN' {
  if (event.hideEvent) return 'HIDDEN';
  if (event.stopRegistration) return 'CLOSED';
  
  const daysRemaining = getDaysRemaining(event.registrationDeadline.$date);
  if (daysRemaining < 0) return 'CLOSED';
  
  return 'OPEN';
}
