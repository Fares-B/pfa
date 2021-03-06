<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AccountType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', TextType::class, [
                "label" => "Email",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('name', TextType::class, [
                "label" => "Nom",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('siret', TextType::class, [
                "label" => "Siret",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('address', TextType::class, [
                "label" => "Adresse",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
