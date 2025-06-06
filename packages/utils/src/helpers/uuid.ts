/**
 * Generates a unique identifier using the `nanoid` library.
 *
 * This function is encapsulated in a separate function to allow for easy replacement
 * of the identifier generation library in the future, if needed. By abstracting the
 * identifier generation logic, we can switch to a different library without changing
 * the code that depends on this function.
 *
 * @param {number} characters - The number of characters for the generated identifier.
 * @returns {string} A newly generated unique identifier.
 */

import { nanoid } from 'nanoid';

export const uuid = async (characters?: number): Promise<string> => {
    return nanoid(characters ?? 21);
};
