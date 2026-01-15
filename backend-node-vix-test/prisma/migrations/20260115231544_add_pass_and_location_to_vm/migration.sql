-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('AZURE', 'AWS', 'GCP', 'LOCAL') NULL;
