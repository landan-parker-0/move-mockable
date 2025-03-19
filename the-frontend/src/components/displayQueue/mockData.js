import { faker } from '@faker-js/faker';
import { itemScheme } from '../../utilities/data/itemScheme';

const itemStatus = [
    'Needs attention',
    'Completed',
    'Needs clearing',
    'Requested update',
    'Paused',
    'Pending approval'
]

const groups = ['Team Alpha', 'Team Beta', 'Team Gamma']

export const generateMockData = (count = 10) => {
  return Array.from({ length: count }, () => ({
    [itemScheme.customerName]: faker.person.fullName(),
    [itemScheme.specId]: `152${faker.string.numeric(6)}`,
    [itemScheme.itemEntryCode]: faker.string.alphanumeric(6).toUpperCase(),
    [itemScheme.status]: faker.helpers.arrayElement(itemStatus),
    [itemScheme.submittedAt]: faker.date.recent().toISOString(),
    [itemScheme.group]: faker.helpers.arrayElement(groups),
    [itemScheme.originCode]: faker.string.alphanumeric(4).toUpperCase(),
    [itemScheme.originLocation]: faker.location.city(),
    [itemScheme.assignedUser]: faker.person.fullName(),
  }));
};

export const mockData = generateMockData(20);
