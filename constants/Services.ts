export interface Service {
  id: string;
  name: string;
  iconName: string;
}

export const services: Service[] = [
  { id: '1', name: 'Followers', iconName: 'followers' },
  { id: '2', name: 'Likes', iconName: 'likes' },
  { id: '3', name: 'Comments', iconName: 'comments' },
  { id: '4', name: 'Views', iconName: 'views' },
];

// Service availability by platform (in case some platforms don't support all services)
export const platformServices: Record<string, Service[]> = {
  'Instagram': services,
  'X (Twitter)': services,
  'Facebook': services,
  'TikTok': services,
  'Snapchat': services,
  'Youtube': [
    { id: '1', name: 'Followers', iconName: 'followers' },
    { id: '2', name: 'Likes', iconName: 'likes' },
    { id: '3', name: 'Comments', iconName: 'comments' },
    { id: '4', name: 'Views', iconName: 'views' },
  ],
};

export const getServicesForPlatform = (platformName: string): Service[] => {
  return platformServices[platformName] || services;
}; 